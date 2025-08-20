// import { User } from './auth'
// import { UserRole } from '../types/prisma'

// // Simple database connection placeholder
// // In a real application, this would connect to your database
// export const prisma = {
//   user: {
//     findUnique: async (params: { where: { email?: string; id?: string } }): Promise<User | null> => {
//       // Placeholder implementation - in real app, this would query the database
//       if (params.where.email === 'test@example.com') {
//         return {
//           id: 'user-id',
//           email: 'test@example.com',
//           name: 'Test User',
//           role: UserRole.CLIENT,
//           phone: '+1234567890',
//           isActive: true,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           password: 'hashed-password'
//         }
//       }
//       return null
//     },
//     create: async (params: { data: unknown }): Promise<User> => {
//       // Placeholder implementation
//       const data = (params.data as { data: unknown }).data as {
//         email: string
//         name: string
//         role: string
//         phone?: string
//         password: string
//       }
//       return {
//         id: 'user-id-' + Date.now(),
//         email: data.email,
//         name: data.name,
//                  role: data.role as UserRole,
//         phone: data.phone,
//         isActive: true,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         password: data.password
//       }
//     }
//   }
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
