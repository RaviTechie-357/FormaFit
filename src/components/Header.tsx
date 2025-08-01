'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { logout } from '../redux/slices/authSlice'
import { UserRole } from '../types/prisma'
<<<<<<< HEAD
import { Menu, X, User, Users, Settings, LogOut, Bell } from 'lucide-react'
=======
import {
  Menu,
  X,
  User,
  Users,
  Settings,
  LogOut,
  Bell,
  Dumbbell,
  Calendar,
  Target,
  Star,
  Award, // ✅ Added missing icons if used below
} from 'lucide-react'
>>>>>>> e583eef (Your commit message here)
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
<<<<<<< HEAD
  
=======

>>>>>>> e583eef (Your commit message here)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await dispatch(logout())
  }

  const getDashboardPath = () => {
    if (!user) return '/auth/login'
    switch (user.role) {
      case UserRole.ADMIN:
        return '/dashboard/admin'
      case UserRole.TRAINER:
        return '/dashboard/trainer'
      case UserRole.CLIENT:
        return '/dashboard/client'
      default:
        return '/dashboard/client'
    }
  }

  const getRoleDisplayName = () => {
    if (!user) return ''
    switch (user.role) {
      case UserRole.ADMIN:
        return 'Admin'
      case UserRole.TRAINER:
        return 'Trainer'
      case UserRole.CLIENT:
        return 'Client'
      default:
        return 'User'
    }
  }

<<<<<<< HEAD
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Trainers', path: '/trainers' },
=======
  // ✅ Added "Features" link to the nav list
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Trainers', path: '/trainers' },
    { name: 'Features', path: '/#features' }, // ✅ NEW
>>>>>>> e583eef (Your commit message here)
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
<<<<<<< HEAD
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.svg"
                alt="FormaFit Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              FormaFit
            </span>
          </Link>
=======

          {/* Logo */}
           <Link href="/" className="flex items-center group">
  {/* ✅ Responsive Logo Container */}
  <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]">
    <Image
      src="/formafitperfect.png"
      alt="FormaFit Logo"
      fill // Fills the container
      className="object-contain transition-transform duration-300 group-hover:scale-110"
    />
  </div>

  {/* ✅ Responsive Brand Text - adjusted margin to tighten spacing */}
  <span className="ml-2 sm:ml-3 md:ml-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
    FormaFit
  </span>
</Link>



>>>>>>> e583eef (Your commit message here)

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
<<<<<<< HEAD
                  isActivePath(item.path)
=======
                  isActivePath(item.path.replace('/#', '/'))
>>>>>>> e583eef (Your commit message here)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Auth & User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{getRoleDisplayName()}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href={getDashboardPath()}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
<<<<<<< HEAD
                    isActivePath(item.path)
=======
                    isActivePath(item.path.replace('/#', '/'))
>>>>>>> e583eef (Your commit message here)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
<<<<<<< HEAD
              
=======

>>>>>>> e583eef (Your commit message here)
              {isAuthenticated && (
                <>
                  <hr className="my-2" />
                  <Link
                    href={getDashboardPath()}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
<<<<<<< HEAD
} 
=======
}
>>>>>>> e583eef (Your commit message here)
