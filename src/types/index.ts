// TODO: Replace these enums with imports from the generated Prisma client when available
export type UserRole = 'ADMIN' | 'TRAINER' | 'CLIENT'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'EXPIRED'
export type NotificationType = 'BOOKING' | 'PAYMENT' | 'REMINDER' | 'GENERAL'

// User Types
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
  trainerProfile?: TrainerProfile
  clientProfile?: ClientProfile
}

export interface TrainerProfile {
  id: string
  userId: string
  bio?: string
  experience: number
  skills: string[]
  rating: number
  totalReviews: number
  hourlyRate: number
  location?: string
  certifications: string[]
  specializations: string[]
  createdAt: string
  updatedAt: string
}

export interface ClientProfile {
  id: string
  userId: string
  fitnessGoals: string[]
  preferences?: Record<string, unknown>
  height?: number
  weight?: number
  age?: number
  medicalHistory?: string
  createdAt: string
  updatedAt: string
}

// Booking Types
export interface Booking {
  id: string
  trainerId: string
  clientId: string
  date: string
  startTime: string
  endTime: string
  status: BookingStatus
  notes?: string
  location?: string
  createdAt: string
  updatedAt: string
  trainer?: User
  client?: User
}

// Review Types
export interface Review {
  id: string
  trainerId: string
  clientId: string
  bookingId?: string
  rating: number
  comment?: string
  createdAt: string
  trainer?: User
  client?: User
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// Subscription Types
export interface Subscription {
  id: string
  userId: string
  trainerId: string
  packageName: string
  sessions: number
  usedSessions: number
  price: number
  expiresAt: string
  status: SubscriptionStatus
  createdAt: string
  updatedAt: string
  user?: User
  trainer?: TrainerProfile
}

// Availability Types
export interface Availability {
  id: string
  trainerId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}

// Message Types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  isRead: boolean
  createdAt: string
  sender?: User
  receiver?: User
}

// Tag Types
export interface Tag {
  id: string
  name: string
  description?: string
  createdAt: string
}

// Media Types
export interface Media {
  id: string
  trainerId: string
  type: string
  url: string
  title?: string
  description?: string
  uploadedAt: string
}

// Goal Types
export interface Goal {
  id: string
  clientId: string
  title: string
  description?: string
  targetDate?: string
  isCompleted: boolean
  progress: number
  createdAt: string
  updatedAt: string
}

// Payment Types
export interface Payment {
  id: string
  bookingId?: string
  userId: string
  amount: number
  currency: string
  status: PaymentStatus
  method?: string
  transactionId?: string
  createdAt: string
  booking?: Booking
  user?: User
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
  phone?: string
}

export interface TrainerProfileFormData {
  bio: string
  experience: number
  skills: string[]
  hourlyRate: number
  location: string
  certifications: string[]
  specializations: string[]
}

export interface ClientProfileFormData {
  fitnessGoals: string[]
  preferences: Record<string, unknown>
  height?: number
  weight?: number
  age?: number
  medicalHistory?: string
}

export interface BookingFormData {
  trainerId: string
  date: string
  startTime: string
  endTime: string
  notes?: string
  location?: string
}

export interface ReviewFormData {
  trainerId: string
  bookingId?: string
  rating: number
  comment?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter Types
export interface TrainerFilters {
  search?: string
  skills?: string[]
  minRating?: number
  maxPrice?: number
  location?: string
  availability?: {
    dayOfWeek: number
    time: string
  }
}

// Auth Types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// UI Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export interface Modal {
  id: string
  isOpen: boolean
  component: React.ComponentType<unknown>
  props?: Record<string, unknown>
} 