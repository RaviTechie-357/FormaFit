// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { authenticateRequest } from "@/lib/authMiddleware";
// import { UserRole } from "@/types/prisma";

// export async function POST(request: NextRequest) {
//   try {
//     // Authenticate user
//     const user = authenticateRequest(request);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // Check if role is CLIENT
//     if (user.role !== UserRole.CLIENT) {
//       return NextResponse.json(
//         { success: false, message: "Only clients can book trainers" },
//         { status: 403 }
//       );
//     }

//     // Parse request body
//     const body = await request.json();
//     const { trainerId, date, time, notes } = body;

//     if (!trainerId || !date || !time) {
//       return NextResponse.json(
//         { success: false, message: "Trainer ID, date, and time are required" },
//         { status: 400 }
//       );
//     }

//     // Check if trainer exists
//     const trainer = await prisma.user.findUnique({
//       where: { id: trainerId, role: UserRole.TRAINER },
//     });

//     if (!trainer) {
//       return NextResponse.json(
//         { success: false, message: "Trainer not found" },
//         { status: 404 }
//       );
//     }

//     // Create booking
//     const booking = await prisma.booking.create({
//       data: {
//         clientId: user.userId,
//         trainerId,
//         date: new Date(date),
//         time: "",
//         notes: notes || "",
//         status: "PENDING", // or CONFIRMED if instant booking
//       },
//     });

//     return NextResponse.json(
//       { success: true, message: "Booking created successfully", booking },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/authMiddleware";
import { UserRole, BookingStatus } from "@/types/prisma";

//POST /api/bookings

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if role is CLIENT
    if (user.role !== UserRole.CLIENT) {
      return NextResponse.json(
        { success: false, message: "Only clients can book trainers" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { trainerId, date, startTime, endTime, notes, location } = body;

    if (!trainerId || !date || !startTime || !endTime || !location) {
      return NextResponse.json(
        {
          success: false,
          message: "Trainer ID, date, startTime, and endTime are required",
        },
        { status: 400 }
      );
    }

    // Check if trainer exists
    const trainer = await prisma.user.findFirst({
      where: {
        id: trainerId,
        role: UserRole.TRAINER,
      },
    });

    if (!trainer) {
      return NextResponse.json(
        { success: false, message: "Trainer not found" },
        { status: 404 }
      );
    }

    // (Optional) Check for booking conflicts
    const conflict = await prisma.booking.findFirst({
      where: {
        trainerId,
        date: new Date(date),
        startTime,
        endTime,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
    });

    if (conflict) {
      return NextResponse.json(
        { success: false, message: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: user.userId, // make sure authenticateRequest returns userId
        trainerId,
        date: new Date(date),
        startTime,
        endTime,
        notes: notes || "",
        location: location || "",
        status: BookingStatus.PENDING,
      },
    });

    return NextResponse.json(
      { success: true, message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

//GET /api/bookings

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let bookings;

    if (user.role === UserRole.CLIENT) {
      // Get bookings for the client
      bookings = await prisma.booking.findMany({
        where: { clientId: user.userId },
        orderBy: { date: "asc" },
        include: {
          trainer: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    } else if (user.role === UserRole.TRAINER) {
      // Get bookings for the trainer
      bookings = await prisma.booking.findMany({
        where: { trainerId: user.userId },
        orderBy: { date: "asc" },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Only trainers or clients can view bookings",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
