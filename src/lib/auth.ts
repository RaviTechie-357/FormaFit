// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { prisma } from "./db";
// import { UserRole } from "../types/prisma";

// const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// export interface JWTPayload {
//   userId: string;
//   email: string;
//   role: UserRole;
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   phone?: string;
//   avatar?: string;
//   isActive: boolean;
//   createdAt: Date; // change from string → Date
//   updatedAt: Date;
//   // createdAt: string;
//   // updatedAt: string;
//   password: string;
// }

// export const hashPassword = async (password: string): Promise<string> => {
//   const saltRounds = 12;
//   return bcrypt.hash(password, saltRounds);
// };

// export const comparePassword = async (
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   return bcrypt.compare(password, hashedPassword);
// };

// export const generateToken = (payload: JWTPayload): string => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// };

// export const verifyToken = (token: string): JWTPayload | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as JWTPayload;
//   } catch {
//     return null;
//   }
// };

// export const getUserFromToken = async (token: string): Promise<User | null> => {
//   const payload = verifyToken(token);
//   if (!payload) return null;

//   const user = await prisma.user.findUnique({
//     where: { id: payload.userId },
//   });

//   return user as User | null;
// };

// export const createUser = async (userData: {
//   email: string;
//   password: string;
//   name: string;
//   role: UserRole;
//   phone?: string;
//   experience?: string | null;
//   description?: string | null;
//   documentation?: string[]; // multiple PDF URLs
//   location?: string | null;
//   rate?: number | null;
// }): Promise<User> => {
//   const hashedPassword = await hashPassword(userData.password);

//   const user = await prisma.user.create({
//     data: {
//       email: userData.email,
//       password: hashedPassword,
//       name: userData.name,
//       role: userData.role,
//       phone: userData.phone,
//       experience: userData.experience,
//       description: userData.description,
//       documentation: userData.documentation,
//       location: userData.location,
//       rate: userData.rate,
//     },
//   });

//   return user as User;
// };

// export const authenticateUser = async (
//   email: string,
//   password: string
// ): Promise<User | null> => {
//   const user = (await prisma.user.findUnique({
//     where: { email },
//   })) as User | null;

//   if (!user) return null;

//   const isValidPassword = await comparePassword(password, user.password);
//   if (!isValidPassword) return null;

//   return user;
// };

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { prisma } from "./db";
// import { User, UserRole } from "@prisma/client";

// const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// export interface JWTPayload {
//   userId: string;
//   email: string;
//   role: UserRole;
// }

// // 🔹 Hash password
// export const hashPassword = async (password: string): Promise<string> => {
//   const saltRounds = 12;
//   return bcrypt.hash(password, saltRounds);
// };

// // 🔹 Compare password
// export const comparePassword = async (
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   return bcrypt.compare(password, hashedPassword);
// };

// // 🔹 Generate JWT
// export const generateToken = (payload: JWTPayload): string => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// };

// // 🔹 Verify JWT
// export const verifyToken = (token: string): JWTPayload | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as JWTPayload;
//   } catch {
//     return null;
//   }
// };

// // 🔹 Get user from token
// export const getUserFromToken = async (token: string): Promise<User | null> => {
//   const payload = verifyToken(token);
//   if (!payload) return null;

//   return prisma.user.findUnique({
//     where: { id: payload.userId },
//   });
// };

// // 🔹 Create user
// export const createUser = async (userData: {
//   email: string;
//   password: string;
//   name: string;
//   role: UserRole;
//   phone?: string;
//   experience?: string | null;
//   description?: string | null;
//   documentation?: string[];
//   location?: string | null;
//   rate?: number | null;
// }): Promise<User> => {
//   const hashedPassword = await hashPassword(userData.password);

//   return prisma.user.create({
//     data: {
//       email: userData.email,
//       password: hashedPassword,
//       name: userData.name,
//       role: userData.role,
//       phone: userData.phone,
//       experience: userData.experience,
//       description: userData.description,
//       documentation: userData.documentation,
//       location: userData.location,
//       rate: userData.rate,
//     },
//   });
// };

// // 🔹 Authenticate user
// export const authenticateUser = async (
//   email: string,
//   password: string
// ): Promise<User | null> => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) return null;

//   const isValidPassword = await comparePassword(password, user.password);
//   if (!isValidPassword) return null;

//   return user;
// };

import prisma from "../lib/db";

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "TRAINER" | "CLIENT";
  experience?: string; // trainer only
  location?: string; // trainer only
  documentation?: string[]; // trainer only
  age?: number; // client only
}

export async function createUser(userData: CreateUserData) {
  try {
    if (userData.role === "TRAINER") {
      return await prisma.user.create({
        data: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          role: "TRAINER",
          trainerProfile: {
            create: {
              experience: userData.experience,
              location: userData.location,
              documentation: userData.documentation || [],
            },
          },
        },
        include: { trainerProfile: true },
      });
    }

    if (userData.role === "CLIENT") {
      return await prisma.user.create({
        data: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          role: "CLIENT",
          clientProfile: {
            create: {
              age: userData.age,
            },
          },
        },
        include: { clientProfile: true },
      });
    }

    // Default case → ADMIN or future roles
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
