import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'
import { UserRole } from '../types/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  password: string
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export const getUserFromToken = async (token: string): Promise<User | null> => {
  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  })

  return user as User | null
}

export const createUser = async (userData: {
  email: string
  password: string
  name: string
  role: UserRole
  phone?: string
}): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password)

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
    },
  })

  return user as User
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  }) as User | null

  if (!user) return null

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) return null

  return user
} 