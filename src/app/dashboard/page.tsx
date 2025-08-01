'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { UserRole } from '../../types/prisma'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login')
        return
      }

      // Redirect to role-specific dashboard
      switch (user?.role) {
        case UserRole.ADMIN:
          router.push('/dashboard/admin')
          break
        case UserRole.TRAINER:
          router.push('/dashboard/trainer')
          break
        case UserRole.CLIENT:
          router.push('/dashboard/client')
          break
        default:
          router.push('/dashboard/client')
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
} 