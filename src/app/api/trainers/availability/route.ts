import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/authMiddleware";
import { UserRole } from "@/types/prisma";

// PATCH: Update trainer availability (per day entry)
export async function PATCH(request: NextRequest) {
  try {
    const user = authenticateRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.role !== UserRole.TRAINER) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only trainers can update availability",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Expecting array of availability entries
    const { availability } = body;

    if (!Array.isArray(availability) || availability.length === 0) {
      return NextResponse.json(
        { success: false, message: "Availability data is invalid or empty" },
        { status: 400 }
      );
    }

    // Delete existing availability entries for this trainer
    await prisma.availability.deleteMany({
      where: { trainerId: user.userId },
    });

    // Insert new entries
    const created = await prisma.availability.createMany({
      data: availability.map((slot: any) => ({
        trainerId: user.userId,
        dayOfWeek: slot.dayOfWeek, // 0 = Sunday, 6 = Saturday
        startTime: slot.startTime,
        endTime: slot.endTime,
        isActive: slot.isActive ?? true,
      })),
    });

    return NextResponse.json({
      success: true,
      message: "Availability updated successfully",
      inserted: created.count,
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
