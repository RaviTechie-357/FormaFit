import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { UserRole } from "@/types/prisma";
import { authenticateRequest } from "@/lib/authMiddleware";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticateRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Trainer ID is required" },
        { status: 400 }
      );
    }

    const trainer = await prisma.user.findUnique({
      where: {
        id,
        role: UserRole.TRAINER,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,

        trainerProfile: {
          select: {
            bio: true,
            experience: true,
            skills: true,
            rating: true,
            totalReviews: true,
            hourlyRate: true,
            location: true,
            certifications: true,
            specializations: true,
          },
        },

        trainerTags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },

        media: {
          select: {
            id: true,
            type: true,
            url: true,
            title: true,
            description: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!trainer) {
      return NextResponse.json(
        { success: false, message: "Trainer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, trainer }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch trainer:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch trainer" },
      { status: 500 }
    );
  }
}

// DELETE /api/trainers/:id — Admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticateRequest(request);

    if (!user || user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admins only" },
        { status: 401 }
      );
    }

    const trainerId = params.id;

    // Optional: Check if trainer exists
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
    });

    if (!trainer || trainer.role !== UserRole.TRAINER) {
      return NextResponse.json(
        { success: false, message: "Trainer not found or invalid role" },
        { status: 404 }
      );
    }

    // Perform deletion
    await prisma.user.delete({
      where: { id: trainerId },
    });

    return NextResponse.json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete trainer" },
      { status: 500 }
    );
  }
}
