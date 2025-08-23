// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../lib/db";
// import { UserRole } from "../../../types/prisma";
// import { authenticateRequest } from "../../../lib/authMiddleware";

// export async function GET(request: NextRequest) {
//   try {
//     const user = authenticateRequest(request);

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }
//     const trainers = await prisma.user.findMany({
//       where: {
//         role: UserRole.TRAINER,
//         isActive: true,
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         avatar: true,
//         createdAt: true,
//         updatedAt: true,

//         trainerProfile: {
//           select: {
//             bio: true,
//             experience: true,
//             skills: true,
//             rating: true,
//             totalReviews: true,
//             hourlyRate: true,
//             location: true,
//             certifications: true,
//             specializations: true,
//           },
//         },

//         trainerTags: {
//           select: {
//             tag: {
//               select: {
//                 id: true,
//                 name: true,
//                 description: true,
//               },
//             },
//           },
//         },

//         media: {
//           select: {
//             id: true,
//             type: true,
//             url: true,
//             title: true,
//             description: true,
//             uploadedAt: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       trainers,
//     });
//   } catch (error) {
//     console.error("Failed to fetch trainers:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch trainers" },
//       { status: 500 }
//     );
//   }
// }

// // -------------------- POST: Add/Update Trainer (Admin Only) --------------------
// export async function POST(request: NextRequest) {
//   try {
//     const user = authenticateRequest(request);

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (user.role !== UserRole.ADMIN) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Forbidden: Only admins can add or update trainers",
//         },
//         { status: 403 }
//       );
//     }

//     const body = await request.json();
//     const {
//       id,
//       name,
//       email,
//       phone,
//       avatar,
//       bio,
//       experience,
//       skills,
//       rating,
//       totalReviews,
//       hourlyRate,
//       location,
//       certifications,
//       specializations,
//     } = body;

//     if (!name || !email) {
//       return NextResponse.json(
//         { success: false, message: "Name and Email are required" },
//         { status: 400 }
//       );
//     }

//     const trainerUser = await prisma.user.upsert({
//       where: { id: id || "" },
//       update: {
//         name,
//         email,
//         phone,
//         avatar,
//         role: UserRole.TRAINER,
//         isActive: true,
//       },
//       create: {
//         name,
//         email,
//         phone,
//         avatar,
//         role: UserRole.TRAINER,
//         isActive: true,
//       },
//     });

//     const trainerProfile = await prisma.trainerProfile.upsert({
//       where: { userId: trainerUser.id },
//       update: {
//         bio,
//         experience,
//         skills,
//         rating,
//         totalReviews,
//         hourlyRate,
//         location,
//         certifications,
//         specializations,
//       },
//       create: {
//         userId: trainerUser.id,
//         bio,
//         experience,
//         skills,
//         rating,
//         totalReviews,
//         hourlyRate,
//         location,
//         certifications,
//         specializations,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Trainer created/updated successfully",
//       data: {
//         user: trainerUser,
//         profile: trainerProfile,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating/updating trainer:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { UserRole } from "@/types/prisma";
import { authenticateRequest } from "@/lib/authMiddleware";

// -------------------- GET: List All Trainers --------------------
export async function GET(request: NextRequest) {
  try {
    // const user = authenticateRequest(request);

    // if (!user) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const trainers = await prisma.user.findMany({
      where: {
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

    return NextResponse.json({
      success: true,
      trainers,
    });
  } catch (error) {
    console.error("Failed to fetch trainers:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch trainers" },
      { status: 500 }
    );
  }
}

// // -------------------- POST: Add/Update Trainer (Admin Only) --------------------
// export async function POST(request: NextRequest) {
//   try {
//     const user = authenticateRequest(request);

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (user.role !== UserRole.ADMIN) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Forbidden: Only admins can add or update trainers",
//         },
//         { status: 403 }
//       );
//     }

//     const body = await request.json();
//     const {
//       id,
//       name,
//       email,
//       phone,
//       avatar,
//       bio,
//       experience,
//       skills,
//       rating,
//       totalReviews,
//       hourlyRate,
//       location,
//       certifications,
//       specializations,
//     } = body;

//     if (!name || !email) {
//       return NextResponse.json(
//         { success: false, message: "Name and Email are required" },
//         { status: 400 }
//       );
//     }

//     const trainerUser = await prisma.user.upsert({
//       where: { id: id || "" },
//       update: {
//         name,
//         email,
//         phone,
//         avatar,
//         role: UserRole.TRAINER,
//         isActive: true,
//       },
//       create: {
//         name,
//         email,
//         phone,
//         avatar,
//         role: UserRole.TRAINER,
//         isActive: true,
//         password: "defaultpassword123",
//       },
//     });

//     const trainerProfile = await prisma.trainerProfile.upsert({
//       where: { userId: trainerUser.id },
//       update: {
//         bio,
//         experience,
//         skills,
//         rating,
//         totalReviews,
//         hourlyRate,
//         location,
//         certifications,
//         specializations,
//       },
//       create: {
//         userId: trainerUser.id,
//         bio,
//         experience,
//         skills,
//         rating,
//         totalReviews,
//         hourlyRate,
//         location,
//         certifications,
//         specializations,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Trainer created/updated successfully",
//       data: {
//         user: trainerUser,
//         profile: trainerProfile,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating/updating trainer:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// -------------------- POST: Add/Update Trainer (Admin Only) --------------------
export async function POST(request: NextRequest) {
  try {
    const user = authenticateRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only admins can add or update trainers",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      avatar,
      bio,
      experience,
      skills,
      rating,
      totalReviews,
      hourlyRate,
      location,
      certifications,
      specializations,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Type conversions
    const parsedExperience = parseInt(experience) || 0;
    const parsedRating = parseFloat(rating) || 0;
    const parsedHourlyRate = parseFloat(hourlyRate) || 0;
    const parsedTotalReviews = parseInt(totalReviews) || 0;

    // Array parsing (ensure values are arrays)
    const parsedSkills = Array.isArray(skills)
      ? skills
      : skills?.split(",").map((s: string) => s.trim()) || [];

    const parsedCertifications = Array.isArray(certifications)
      ? certifications
      : certifications?.split(",").map((c: string) => c.trim()) || [];

    const parsedSpecializations = Array.isArray(specializations)
      ? specializations
      : specializations?.split(",").map((s: string) => s.trim()) || [];

    // Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    let trainerUser;

    if (existingUser) {
      if (existingUser.role !== UserRole.TRAINER) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A user with this email already exists with a different role",
          },
          { status: 400 }
        );
      }

      // Update existing trainer
      trainerUser = await prisma.user.update({
        where: { email },
        data: {
          name,
          phone,
          avatar,
          isActive: true,
        },
      });
    } else {
      // Create new trainer
      trainerUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          avatar,
          role: UserRole.TRAINER,
          isActive: true,
          password: "defaultpassword123", // Hash this in production!
        },
      });
    }

    // Upsert trainer profile
    const trainerProfile = await prisma.trainerProfile.upsert({
      where: { userId: trainerUser.id },
      update: {
        bio,
        experience: parsedExperience,
        skills: parsedSkills,
        rating: parsedRating,
        totalReviews: parsedTotalReviews,
        hourlyRate: parsedHourlyRate,
        location,
        certifications: parsedCertifications,
        specializations: parsedSpecializations,
      },
      create: {
        userId: trainerUser.id,
        bio,
        experience: parsedExperience,
        skills: parsedSkills,
        rating: parsedRating,
        totalReviews: parsedTotalReviews,
        hourlyRate: parsedHourlyRate,
        location,
        certifications: parsedCertifications,
        specializations: parsedSpecializations,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Trainer created/updated successfully",
      data: {
        user: trainerUser,
        profile: trainerProfile,
      },
    });
  } catch (error) {
    console.error("Error creating/updating trainer:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
