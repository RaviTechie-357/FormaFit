// // app/api/bookings/[id]/status/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { authenticateRequest } from "@/lib/authMiddleware";
// // import { BookingStatus, UserRole } from "@prisma/client";
// import { UserRole, BookingStatus } from "@/types/prisma";

// export async function PATCH(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params; // ✅ FIX: Await params
//   try {
//     const user = authenticateRequest(request);
//     if (!user || user.role !== UserRole.ADMIN) {
//       return NextResponse.json(
//         { success: false, message: "Forbidden: Admins only" },
//         { status: 403 }
//       );
//     }

//     const { status } = await request.json();

//     if (!params.id) {
//       return NextResponse.json(
//         { success: false, message: "Invalid booking ID" },
//         { status: 400 }
//       );
//     }

//     if (!Object.values(BookingStatus).includes(status)) {
//       return NextResponse.json(
//         { success: false, message: "Invalid booking status" },
//         { status: 400 }
//       );
//     }

//     const updatedBooking = await prisma.booking.update({
//       where: { id: params.id },
//       data: { status },
//       include: {
//         trainer: { select: { id: true, name: true } },
//         client: { select: { id: true, name: true } },
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Booking status updated",
//         booking: updatedBooking,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating booking status:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/bookings/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/authMiddleware";
import { UserRole, BookingStatus } from "@/types/prisma";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX: Await params

  try {
    const user = authenticateRequest(request);
    if (!user || user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    const { status } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid booking ID" },
        { status: 400 }
      );
    }

    if (!Object.values(BookingStatus).includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid booking status" },
        { status: 400 }
      );
    }

    // ✅ Check booking exists before updating
    const existingBooking = await prisma.booking.findUnique({ where: { id } });
    if (!existingBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        trainer: { select: { id: true, name: true } },
        client: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking status updated",
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
