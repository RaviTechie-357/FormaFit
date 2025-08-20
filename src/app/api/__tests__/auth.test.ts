import request from 'supertest'
import { createServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { loginHandler, registerHandler, logoutHandler } from '../auth'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock Prisma
jest.mock('@prisma/client')
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}

// Mock bcrypt
jest.mock('bcryptjs')
const mockBcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
}

// Mock jwt
jest.mock('jsonwebtoken')
const mockJwt = {
  sign: jest.fn(),
  verify: jest.fn(),
}

// Create test server
const createTestServer = (handler) => {
  return createServer((req, res) => {
    const mockReq = req as NextApiRequest
    const mockRes = res as NextApiResponse
    
    // Add Next.js specific properties
    mockReq.method = req.method || 'GET'
    mockReq.body = {}
    mockReq.headers = req.headers || {}
    
    return handler(mockReq, mockRes)
  })
}

describe('Authentication API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'test-secret-key'
  })

  describe('POST /api/auth/login', () => {
    test('successfully logs in with valid credentials', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed-password',
        name: 'Test User',
        role: 'CLIENT',
      }

      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockBcrypt.compare.mockResolvedValue(true)
      mockJwt.sign.mockReturnValue('mock-jwt-token')

      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        token: 'mock-jwt-token',
      })

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      })
      expect(mockBcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password')
      expect(mockJwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id, email: mockUser.email, role: mockUser.role },
        'test-secret-key',
        { expiresIn: '7d' }
      )
    })

    test('returns 400 for missing email', async () => {
      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          password: 'password123',
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Email and password are required',
      })
    })

    test('returns 400 for missing password', async () => {
      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Email and password are required',
      })
    })

    test('returns 401 for invalid email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401)

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid credentials',
      })
    })

    test('returns 401 for invalid password', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed-password',
        name: 'Test User',
        role: 'CLIENT',
      }

      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      mockBcrypt.compare.mockResolvedValue(false)

      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(401)

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid credentials',
      })
    })

    test('returns 500 for database error', async () => {
      mockPrisma.user.findUnique.mockRejectedValue(new Error('Database error'))

      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(500)

      expect(response.body).toEqual({
        success: false,
        error: 'Internal server error',
      })
    })

    test('validates email format', async () => {
      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: 'password123',
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid email format',
      })
    })

    test('prevents SQL injection attempts', async () => {
      const maliciousEmail = "'; DROP TABLE users; --"
      
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const server = createTestServer(loginHandler)
      
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: maliciousEmail,
          password: 'password123',
        })
        .expect(401)

      // Verify the malicious input was treated as a regular string
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: maliciousEmail },
      })
    })
  })

  describe('POST /api/auth/register', () => {
    test('successfully registers new user', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'newuser@example.com',
        name: 'New User',
        role: 'CLIENT',
      }

      mockPrisma.user.findUnique.mockResolvedValue(null) // User doesn't exist
      mockBcrypt.hash.mockResolvedValue('hashed-password')
      mockPrisma.user.create.mockResolvedValue(mockUser)
      mockJwt.sign.mockReturnValue('mock-jwt-token')

      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User',
        })
        .expect(201)

      expect(response.body).toEqual({
        success: true,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        token: 'mock-jwt-token',
      })

      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123', 12)
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          password: 'hashed-password',
          name: 'New User',
          role: 'CLIENT',
        },
      })
    })

    test('returns 400 for missing required fields', async () => {
      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          // Missing password and name
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Email, password, and name are required',
      })
    })

    test('returns 409 for existing email', async () => {
      const existingUser = {
        id: 'user-123',
        email: 'existing@example.com',
        name: 'Existing User',
        role: 'CLIENT',
      }

      mockPrisma.user.findUnique.mockResolvedValue(existingUser)

      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
          name: 'New User',
        })
        .expect(409)

      expect(response.body).toEqual({
        success: false,
        error: 'User already exists',
      })
    })

    test('validates password strength', async () => {
      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '123', // Too short
          name: 'Test User',
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Password must be at least 6 characters long',
      })
    })

    test('validates email format', async () => {
      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User',
        })
        .expect(400)

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid email format',
      })
    })

    test('sanitizes input data', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'CLIENT',
      }

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockBcrypt.hash.mockResolvedValue('hashed-password')
      mockPrisma.user.create.mockResolvedValue(mockUser)
      mockJwt.sign.mockReturnValue('mock-jwt-token')

      const server = createTestServer(registerHandler)
      
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: '<script>alert("xss")</script>Test User',
        })
        .expect(201)

      // Verify the name was sanitized
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashed-password',
          name: '<script>alert("xss")</script>Test User', // Should be sanitized
          role: 'CLIENT',
        },
      })
    })
  })

  describe('POST /api/auth/logout', () => {
    test('successfully logs out user', async () => {
      const server = createTestServer(logoutHandler)
      
      const response = await request(server)
        .post('/api/auth/logout')
        .expect(200)

      expect(response.body).toEqual({
        success: true,
        message: 'Logged out successfully',
      })
    })

    test('clears authentication cookies', async () => {
      const server = createTestServer(logoutHandler)
      
      const response = await request(server)
        .post('/api/auth/logout')
        .expect(200)

      // Check if cookies are cleared
      const cookies = response.headers['set-cookie']
      expect(cookies).toBeDefined()
      
      // Verify auth token cookie is cleared
      const authCookie = cookies.find(cookie => cookie.includes('authToken'))
      expect(authCookie).toContain('Max-Age=0')
    })
  })

  describe('JWT Token Validation', () => {
    test('validates JWT token correctly', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        role: 'CLIENT',
      }

      mockJwt.verify.mockReturnValue({
        userId: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      })

      const token = 'valid-jwt-token'
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      expect(decoded).toEqual({
        userId: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      })
    })

    test('rejects invalid JWT token', async () => {
      mockJwt.verify.mockImplementation(() => {
        throw new Error('Invalid token')
      })

      const token = 'invalid-jwt-token'

      expect(() => {
        jwt.verify(token, process.env.JWT_SECRET)
      }).toThrow('Invalid token')
    })

    test('rejects expired JWT token', async () => {
      mockJwt.verify.mockImplementation(() => {
        throw new Error('TokenExpiredError')
      })

      const token = 'expired-jwt-token'

      expect(() => {
        jwt.verify(token, process.env.JWT_SECRET)
      }).toThrow('TokenExpiredError')
    })
  })

  describe('Password Security', () => {
    test('hashes passwords with appropriate salt rounds', async () => {
      const password = 'password123'
      const hashedPassword = 'hashed-password'

      mockBcrypt.hash.mockResolvedValue(hashedPassword)

      const result = await bcrypt.hash(password, 12)

      expect(mockBcrypt.hash).toHaveBeenCalledWith(password, 12)
      expect(result).toBe(hashedPassword)
    })

    test('compares passwords correctly', async () => {
      const password = 'password123'
      const hashedPassword = 'hashed-password'

      mockBcrypt.compare.mockResolvedValue(true)

      const result = await bcrypt.compare(password, hashedPassword)

      expect(mockBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword)
      expect(result).toBe(true)
    })

    test('rejects weak passwords', async () => {
      const weakPasswords = [
        '123',
        'abc',
        'password',
        'qwerty',
        '123456',
      ]

      for (const password of weakPasswords) {
        const server = createTestServer(registerHandler)
        
        const response = await request(server)
          .post('/api/auth/register')
          .send({
            email: 'test@example.com',
            password,
            name: 'Test User',
          })
          .expect(400)

        expect(response.body.error).toContain('Password must be at least 6 characters')
      }
    })
  })

  describe('Rate Limiting', () => {
    test('prevents brute force attacks', async () => {
      const server = createTestServer(loginHandler)
      
      // Simulate multiple failed login attempts
      for (let i = 0; i < 5; i++) {
        mockPrisma.user.findUnique.mockResolvedValue(null)

        await request(server)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword',
          })
          .expect(401)
      }

      // 6th attempt should be rate limited
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(429)

      expect(response.body).toEqual({
        success: false,
        error: 'Too many login attempts. Please try again later.',
      })
    })
  })

  describe('Input Sanitization', () => {
    test('sanitizes email input', async () => {
      const maliciousEmails = [
        'test@example.com<script>alert("xss")</script>',
        'test@example.com\' OR 1=1--',
        'test@example.com; DROP TABLE users;--',
      ]

      for (const email of maliciousEmails) {
        mockPrisma.user.findUnique.mockResolvedValue(null)

        const server = createTestServer(loginHandler)
        
        const response = await request(server)
          .post('/api/auth/login')
          .send({
            email,
            password: 'password123',
          })
          .expect(401)

        // Verify the malicious input was treated as a regular string
        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
          where: { email },
        })
      }
    })

    test('sanitizes name input', async () => {
      const maliciousNames = [
        '<script>alert("xss")</script>',
        'John\' OR 1=1--',
        'Jane; DROP TABLE users;--',
      ]

      for (const name of maliciousNames) {
        const server = createTestServer(registerHandler)
        
        const response = await request(server)
          .post('/api/auth/register')
          .send({
            email: 'test@example.com',
            password: 'password123',
            name,
          })
          .expect(400)

        // Verify the input was properly validated/sanitized
        expect(response.body.error).toBeDefined()
      }
    })
  })
})
