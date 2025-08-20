// app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/authMiddleware";
import { UserRole, BookingStatus } from "@/types/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = authenticateRequest(request);

    if (!user || user.role !== UserRole.CLIENT) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Clients only" },
        { status: 403 }
      );
    }

    const { bookingId, rating, comment } = await request.json();

    // Basic validation
    if (!bookingId || !rating) {
      return NextResponse.json(
        { success: false, message: "Booking ID and rating are required" },
        { status: 400 }
      );
    }

    // Find booking and validate ownership + status
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { trainer: true },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.clientId !== user.userId) {
      return NextResponse.json(
        { success: false, message: "You can only review your own bookings" },
        { status: 403 }
      );
    }

    if (booking.status !== BookingStatus.COMPLETED) {
      return NextResponse.json(
        { success: false, message: "You can only review completed bookings" },
        { status: 400 }
      );
    }

    // Check if review already exists for this booking
    const existingReview = await prisma.review.findFirst({
      where: { bookingId },
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "Review already exists for this booking" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        bookingId,
        trainerId: booking.trainerId,
        clientId: user.userId,
        rating,
        comment: comment || "",
      },
    });

    return NextResponse.json(
      { success: true, message: "Review submitted successfully", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/reviews?trainerId=...
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trainerId = searchParams.get("trainerId");

    if (!trainerId) {
      return NextResponse.json(
        { success: false, message: "trainerId query parameter is required" },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: { trainerId },
      include: {
        client: {
          select: { id: true, name: true, avatar: true },
        },
        booking: {
          select: { id: true, date: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
