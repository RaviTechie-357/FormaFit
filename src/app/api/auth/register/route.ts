// import { NextRequest, NextResponse } from 'next/server'
// import { createUser, generateToken } from '../../../../lib/auth'
// import { UserRole } from '../../../../types/prisma'
// import { z } from 'zod'

// const registerSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   confirmPassword: z.string(),
//   role: z.nativeEnum(UserRole),
//   phone: z.string().optional(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// })

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()

//     // Validate input
//     const validatedData = registerSchema.parse(body)

//     // Check if user already exists
//     const { prisma } = await import('../../../../lib/db')
//     const existingUser = await prisma.user.findUnique({
//       where: { email: validatedData.email },
//     })

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: 'User already exists with this email' },
//         { status: 400 }
//       )
//     }

//     // Create user
//     const user = await createUser({
//       name: validatedData.name,
//       email: validatedData.email,
//       password: validatedData.password,
//       role: validatedData.role,
//       phone: validatedData.phone,
//     })

//     // Generate token
//     const token = generateToken({
//       userId: user.id,
//       email: user.email,
//       role: user.role,
//     })

//     // Remove password from response
//     const { password, ...userWithoutPassword } = user

//     return NextResponse.json({
//       success: true,
//       message: 'User registered successfully',
//       user: userWithoutPassword,
//       token,
//     })

//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { success: false, message: 'Validation error', errors: error.errors },
//         { status: 400 }
//       )
//     }

//     console.error('Registration error:', error)
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { createUser, generateToken } from "../../../../lib/auth";
// import { UserRole } from "../../../../types/prisma";
// import { z } from "zod";

// // ✅ Common fields for all roles
// const baseSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string(),
//   role: z.nativeEnum(UserRole),
//   phone: z.string().optional(),
// });

// // ✅ Trainer-specific fields
// const trainerExtraFields = z.object({
//   experience: z.string().min(1, "Experience is required"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   documentation: z
//     .array(z.string().url("Invalid file URL"))
//     .min(1, "At least one document is required"),
//   location: z.string().min(2, "Location is required"),
//   rate: z.number().positive("Rate must be a positive number"),
// });

// // ✅ Full schema with conditional validation
// const registerSchema = z
//   .union([
//     // Case 1: TRAINER → require extra fields
//     baseSchema
//       .extend({
//         role: z.literal(UserRole.TRAINER),
//       })
//       .merge(trainerExtraFields),

//     // Case 2: CLIENT or ADMIN → no extra fields
//     baseSchema.extend({
//       role: z.enum([UserRole.CLIENT, UserRole.ADMIN]),
//     }),
//   ])
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // ✅ Validate input with Zod
//     const validatedData = registerSchema.parse(body);

//     // ✅ Check if user already exists
//     const { prisma } = await import("../../../../lib/db");
//     const existingUser = await prisma.user.findUnique({
//       where: { email: validatedData.email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User already exists with this email" },
//         { status: 400 }
//       );
//     }

//     // ✅ Create user in DB
//     const user = await createUser({
//       name: validatedData.name,
//       email: validatedData.email,
//       password: validatedData.password,
//       role: validatedData.role,
//       phone: validatedData.phone,
//       experience:
//         validatedData.role === UserRole.TRAINER
//           ? validatedData.experience
//           : null,
//       description:
//         validatedData.role === UserRole.TRAINER
//           ? validatedData.description
//           : null,
//       documentation:
//         validatedData.role === UserRole.TRAINER
//           ? validatedData.documentation
//           : [],
//       location:
//         validatedData.role === UserRole.TRAINER ? validatedData.location : null,
//       rate: validatedData.role === UserRole.TRAINER ? validatedData.rate : null,
//     });

//     // ✅ Generate JWT token
//     const token = generateToken({
//       userId: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     // ✅ Remove password before sending response
//     const { password, ...userWithoutPassword } = user;

//     return NextResponse.json({
//       success: true,
//       message: "User registered successfully",
//       user: userWithoutPassword,
//       token,
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { success: false, message: "Validation error", errors: error.errors },
//         { status: 400 }
//       );
//     }

//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // app/api/trainer/register/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { z } from "zod";
// import fs from "fs";
// import path from "path";
// import formidable from "formidable";

// // ⛔ Tell Next.js not to parse body (formidable will handle it)
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // ✅ Validation schema (no validation for files, only other fields)
// const trainerSchema = z.object({
//   specialization: z.string(),
//   experience: z.string(),
//   hourlyRate: z.string(),
//   contactNumber: z.string(),
//   certifications: z.array(z.string()).optional(),
//   aboutMe: z.string(),
// });

// export async function POST(req: NextRequest) {
//   try {
//     const uploadDir = path.join(process.cwd(), "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     const form = formidable({
//       multiples: true,
//       uploadDir,
//       keepExtensions: true,
//     });

//     // Parse form-data request
//     const { fields, files }: any = await new Promise((resolve, reject) => {
//       form.parse(req as any, (err, fields, files) => {
//         if (err) reject(err);
//         else resolve({ fields, files });
//       });
//     });

//     // Validate fields with Zod
//     const validatedData = trainerSchema.parse({
//       specialization: fields.specialization,
//       experience: fields.experience,
//       hourlyRate: fields.hourlyRate,
//       contactNumber: fields.contactNumber,
//       certifications: fields.certifications
//         ? JSON.parse(fields.certifications)
//         : [],
//       aboutMe: fields.aboutMe,
//     });

//     // Prepare documentation URLs
//     let documentationUrls: string[] = [];
//     if (files.documentation) {
//       const docsArray = Array.isArray(files.documentation)
//         ? files.documentation
//         : [files.documentation];

//       documentationUrls = docsArray.map(
//         (file: any) => `/uploads/${path.basename(file.filepath)}`
//       );
//     }

//     // Save trainer in DB
//     const trainer = await prisma.trainerProfile.create({
//       data: {
//         ...validatedData,
//         documentation: documentationUrls,
//       },
//     });

//     return NextResponse.json({ success: true, trainer }, { status: 201 });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }

// // app/api/register/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { z } from "zod";
// import fs from "fs";
// import path from "path";
// import formidable, { Fields, Files } from "formidable";
// import bcrypt from "bcryptjs";

// export const config = {
//   api: { bodyParser: false },
// };

// // Base user validation
// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email(),
//   password: z.string().min(6),
//   role: z.enum(["TRAINER", "CLIENT", "ADMIN"]),
//   phone: z.string().optional(),
// });

// // Trainer profile validation
// const trainerSchema = z.object({
//   bio: z.string().optional(),
//   experience: z.string().optional(),
//   skills: z.array(z.string()).optional(),
//   hourlyRate: z.string(),
//   location: z.string().optional(),
//   certifications: z.array(z.string()).optional(),
//   specializations: z.array(z.string()).optional(),
// });

// export async function POST(req: NextRequest) {
//   try {
//     // Ensure uploads directory exists
//     const uploadDir = path.join(process.cwd(), "uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

//     // Parse incoming form-data
//     const form = formidable({
//       multiples: true,
//       uploadDir,
//       keepExtensions: true,
//     });

//     const { fields, files }: { fields: Fields; files: Files } =
//       await new Promise((resolve, reject) => {
//         form.parse(req as any, (err, fields, files) => {
//           if (err) reject(err);
//           else resolve({ fields, files });
//         });
//       });

//     // ✅ Validate and extract user data
//     const validatedUser = userSchema.parse({
//       name: fields.name,
//       email: fields.email,
//       password: fields.password,
//       role: fields.role,
//       phone: fields.phone,
//     });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

//     // Prepare profile creation based on role
//     let profileData = {};

//     if (validatedUser.role === "TRAINER") {
//       const validatedTrainer = trainerSchema.parse({
//         bio: fields.bio,
//         experience: fields.experience,
//         skills:
//           typeof fields.skills === "string"
//             ? JSON.parse(fields.skills as unknown as string)
//             : fields.skills || [],
//         hourlyRate: fields.hourlyRate,
//         location: fields.location,
//         certifications:
//           typeof fields.certifications === "string"
//             ? JSON.parse(fields.certifications as unknown as string)
//             : fields.certifications || [],
//         specializations:
//           typeof fields.specializations === "string"
//             ? JSON.parse(fields.specializations as unknown as string)
//             : fields.specializations || [],
//       });

//       // Handle documentation file uploads
//       let documentationUrls: string[] = [];
//       if (files.documentation) {
//         const docsArray = Array.isArray(files.documentation)
//           ? files.documentation
//           : [files.documentation];

//         documentationUrls = docsArray.map(
//           (file: any) => `/uploads/${path.basename(file.filepath)}`
//         );
//       }

//       profileData = {
//         trainerProfile: {
//           create: {
//             ...validatedTrainer,
//             hourlyRate: parseFloat(validatedTrainer.hourlyRate),
//             documentation: documentationUrls,
//           },
//         },
//       };
//     } else if (validatedUser.role === "CLIENT") {
//       profileData = {
//         clientProfile: {
//           create: {
//             fitnessGoals: [],
//           },
//         },
//       };
//     }

//     // ✅ Create user with appropriate profile
//     const user = await prisma.user.create({
//       data: {
//         name: validatedUser.name,
//         email: validatedUser.email,
//         password: hashedPassword,
//         role: validatedUser.role,
//         phone: validatedUser.phone,
//         ...profileData,
//       },
//       include: {
//         trainerProfile: true,
//         clientProfile: true,
//       },
//     });

//     return NextResponse.json({ success: true, user }, { status: 201 });
//   } catch (error: any) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { z } from "zod";
// import fs from "fs";
// import path from "path";
// import formidable, { Fields, Files } from "formidable";
// import bcrypt from "bcryptjs";
// import { IncomingMessage } from "http";

// // Disable automatic body parsing
// export const config = {
//   api: { bodyParser: false },
// };

// function toNodeReadable(req: Request): IncomingMessage {
//   const { readable, writable } = new TransformStream();
//   req.body?.pipeTo(writable);
//   const nodeReq = Object.assign(readable as any, {
//     headers: Object.fromEntries(req.headers),
//     method: req.method,
//     url: req.url,
//   });
//   return nodeReq as unknown as IncomingMessage;
// }

// export async function POST(req: Request) {
//   try {
//     const nodeReq = toNodeReadable(req);

//     const uploadDir = path.join(process.cwd(), "uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

//     const form = formidable({
//       multiples: true,
//       uploadDir,
//       keepExtensions: true,
//     });

//     const { fields, files }: { fields: Fields; files: Files } =
//       await new Promise((resolve, reject) => {
//         form.parse(nodeReq, (err, fields, files) => {
//           if (err) reject(err);
//           else resolve({ fields, files });
//         });
//       });

//     // --- Zod validation (same as your code) ---
//     const userSchema = z.object({
//       name: z.string().min(1, "Name is required"),
//       email: z.string().email(),
//       password: z.string().min(6),
//       role: z.enum(["TRAINER", "CLIENT", "ADMIN"]),
//       phone: z.string().optional(),
//     });

//     const trainerSchema = z.object({
//       bio: z.string().optional(),
//       experience: z.string().optional(),
//       skills: z.array(z.string()).optional(),
//       hourlyRate: z.string(),
//       location: z.string().optional(),
//       certifications: z.array(z.string()).optional(),
//       specializations: z.array(z.string()).optional(),
//     });

//     const validatedUser = userSchema.parse({
//       name: fields.name,
//       email: fields.email,
//       password: fields.password,
//       role: fields.role,
//       phone: fields.phone,
//     });

//     const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

//     let profileData = {};
//     if (validatedUser.role === "TRAINER") {
//       const validatedTrainer = trainerSchema.parse({
//         bio: fields.bio,
//         experience: fields.experience,
//         skills:
//           typeof fields.skills === "string"
//             ? JSON.parse(fields.skills)
//             : fields.skills || [],
//         hourlyRate: fields.hourlyRate,
//         location: fields.location,
//         certifications:
//           typeof fields.certifications === "string"
//             ? JSON.parse(fields.certifications)
//             : fields.certifications || [],
//         specializations:
//           typeof fields.specializations === "string"
//             ? JSON.parse(fields.specializations)
//             : fields.specializations || [],
//       });

//       let documentationUrls: string[] = [];
//       if (files.documentation) {
//         const docsArray = Array.isArray(files.documentation)
//           ? files.documentation
//           : [files.documentation];
//         documentationUrls = docsArray.map(
//           (file: any) => `/uploads/${path.basename(file.filepath)}`
//         );
//       }

//       profileData = {
//         trainerProfile: {
//           create: {
//             ...validatedTrainer,
//             hourlyRate: parseFloat(validatedTrainer.hourlyRate),
//             documentation: documentationUrls,
//           },
//         },
//       };
//     } else if (validatedUser.role === "CLIENT") {
//       profileData = {
//         clientProfile: { create: { fitnessGoals: [] } },
//       };
//     }

//     const user = await prisma.user.create({
//       data: {
//         name: validatedUser.name,
//         email: validatedUser.email,
//         password: hashedPassword,
//         role: validatedUser.role,
//         phone: validatedUser.phone,
//         ...profileData,
//       },
//       include: { trainerProfile: true, clientProfile: true },
//     });

//     return NextResponse.json({ success: true, user }, { status: 201 });
//   } catch (error: any) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { z } from "zod";
// import fs from "fs";
// import path from "path";
// import formidable, { Fields, Files } from "formidable";
// import bcrypt from "bcryptjs";
// import { Readable } from "stream";

// // Disable automatic body parsing
// export const config = {
//   api: { bodyParser: false },
// };

// // Convert Fetch API Request -> Node IncomingMessage-like
// function toNodeRequest(req: Request) {
//   const body = req.body ? Readable.fromWeb(req.body as any) : null;
//   const nodeReq: any = body || new Readable();
//   nodeReq.headers = Object.fromEntries(req.headers);
//   nodeReq.method = req.method;
//   nodeReq.url = req.url;
//   return nodeReq;
// }

// export async function POST(req: Request) {
//   try {
//     const nodeReq = toNodeRequest(req);

//     // Ensure uploads dir
//     const uploadDir = path.join(process.cwd(), "uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

//     const form = formidable({
//       multiples: true,
//       uploadDir,
//       keepExtensions: true,
//     });

//     const { fields, files }: { fields: Fields; files: Files } =
//       await new Promise((resolve, reject) => {
//         form.parse(nodeReq, (err, fields, files) => {
//           if (err) reject(err);
//           else resolve({ fields, files });
//         });
//       });

//     // ✅ Zod validation
//     const userSchema = z.object({
//       name: z.string().min(1, "Name is required"),
//       email: z.string().email(),
//       password: z.string().min(6),
//       role: z.enum(["TRAINER", "CLIENT", "ADMIN"]),
//       phone: z.string().optional(),
//     });

//     const trainerSchema = z.object({
//       bio: z.string().optional(),
//       experience: z.string().optional(),
//       skills: z.array(z.string()).optional(),
//       hourlyRate: z.string(),
//       location: z.string().optional(),
//       certifications: z.array(z.string()).optional(),
//       specializations: z.array(z.string()).optional(),
//     });

//     const validatedUser = userSchema.parse({
//       name: fields.name,
//       email: fields.email,
//       password: fields.password,
//       role: fields.role,
//       phone: fields.phone,
//     });

//     const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

//     let profileData = {};
//     if (validatedUser.role === "TRAINER") {
//       const validatedTrainer = trainerSchema.parse({
//         bio: fields.bio,
//         experience: fields.experience,
//         skills:
//           typeof fields.skills === "string"
//             ? JSON.parse(fields.skills)
//             : fields.skills || [],
//         hourlyRate: fields.hourlyRate,
//         location: fields.location,
//         certifications:
//           typeof fields.certifications === "string"
//             ? JSON.parse(fields.certifications)
//             : fields.certifications || [],
//         specializations:
//           typeof fields.specializations === "string"
//             ? JSON.parse(fields.specializations)
//             : fields.specializations || [],
//       });

//       let documentationUrls: string[] = [];
//       if (files.documentation) {
//         const docsArray = Array.isArray(files.documentation)
//           ? files.documentation
//           : [files.documentation];
//         documentationUrls = docsArray.map(
//           (file: any) => `/uploads/${path.basename(file.filepath)}`
//         );
//       }

//       profileData = {
//         trainerProfile: {
//           create: {
//             ...validatedTrainer,
//             hourlyRate: parseFloat(validatedTrainer.hourlyRate),
//             documentation: documentationUrls,
//           },
//         },
//       };
//     } else if (validatedUser.role === "CLIENT") {
//       profileData = {
//         clientProfile: { create: { fitnessGoals: [] } },
//       };
//     }

//     const user = await prisma.user.create({
//       data: {
//         name: validatedUser.name,
//         email: validatedUser.email,
//         password: hashedPassword,
//         role: validatedUser.role,
//         phone: validatedUser.phone,
//         ...profileData,
//       },
//       include: { trainerProfile: true, clientProfile: true },
//     });

//     return NextResponse.json({ success: true, user }, { status: 201 });
//   } catch (error: any) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }

// // app/api/auth/register/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { createUser } from "@/lib/auth"; // your function
// import fs from "fs";
// import path from "path";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const role = formData.get("role") as string;

//     const files = formData.getAll("documentation") as File[]; // multiple files

//     const savedFiles: string[] = [];

//     for (const file of files) {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const filePath = path.join(process.cwd(), "public", "uploads", file.name);
//       fs.writeFileSync(filePath, buffer);
//       savedFiles.push(`/uploads/${file.name}`);
//     }

//     const user = await createUser({
//       email,
//       password,
//       name,
//       role: role as any,
//       documentation: savedFiles,
//     });

//     return NextResponse.json({ success: true, user });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, error: "Failed to register" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { createUser } from "@/lib/auth";
// import fs from "fs";
// import path from "path";

// export async function POST(req: NextRequest) {
//   try {
//     console.log("req :", req);
//     const formData = await req.formData();
//     console.log("FormData : ", formData);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const role = formData.get("role") as string;

//     if (!name || !email || !password || !role) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadsDir))
//       fs.mkdirSync(uploadsDir, { recursive: true });

//     const file = formData.get("documentation") as File | null;
//     const savedFiles: string[] = [];

//     if (file) {
//       console.log(file);
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const filePath = path.join(uploadsDir, file.name);
//       fs.writeFileSync(filePath, buffer);
//       savedFiles.push(`/uploads/${file.name}`);
//     }

//     const user = await createUser({
//       email,
//       password,
//       name,
//       role: role as any,
//       documentation: savedFiles,
//     });

//     return NextResponse.json({ success: true, user });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, error: "Failed to register" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const role = formData.get("role") as string | null;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Base user data
    const userData: any = {
      email,
      password,
      name,
      role,
    };

    // Handle trainer-only fields
    if (role === "TRAINER") {
      const experience = formData.get("experience") as string | null;
      const specialization = formData.get("specialization") as string | null;
      const hourlyRate = formData.get("hourlyRate") as string | null;

      if (!experience || !specialization || !hourlyRate) {
        return NextResponse.json(
          { success: false, error: "Missing trainer details" },
          { status: 400 }
        );
      }

      // Attach trainer-specific info
      userData.experience = experience;
      userData.specialization = specialization;
      userData.hourlyRate = Number(hourlyRate);

      // Handle documentation upload
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const file = formData.get("documentation") as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = file.name || `upload-${Date.now()}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, buffer);
        userData.documentation = [`/uploads/${fileName}`];
      } else {
        return NextResponse.json(
          { success: false, error: "Trainer must upload documentation" },
          { status: 400 }
        );
      }
    }

    // Call prisma createUser
    const user = await createUser(userData);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to register" },
      { status: 500 }
    );
  }
}
