'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Link from 'next/link'
import { 
  Dumbbell, 
  Users, 
  Star, 
  Calendar, 
  Target, 
  Award,
  ArrowRight
} from 'lucide-react'
import { CountUp } from "./dashboard/Count"
import Footer from '../components/Footer'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Auto-redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      if (user.role === 'TRAINER') {
        router.push('/dashboard/trainer')
      } else if (user.role === 'CLIENT') {
        router.push('/dashboard/client')
      } else if (user.role === 'ADMIN') {
        router.push('/dashboard/admin')
      }
    }
  }, [isAuthenticated, user, router])

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Expert Trainers',
      description: 'Connect with certified fitness professionals who specialize in your goals.'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with real-time availability.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Goal Tracking',
      description: 'Set and track your fitness goals with personalized progress monitoring.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real clients to choose the best trainer.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Join a community of fitness enthusiasts and stay motivated.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certified Professionals',
      description: 'All trainers are verified and certified in their specialties.'
    }
  ]

  const stats = [
    { number: 500, label: 'Certified Trainers', suffix: '+' },
    { number: 10000, label: 'Happy Clients', suffix: '+' },
    { number: 50000, label: 'Sessions Completed', suffix: '+' },
    { number: 4.8, label: 'Average Rating', suffix: '' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dumbbell className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FormaFit</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push('/auth/register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Find Your Perfect
                <span className="text-blue-600 block">Fitness Trainer</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with certified fitness professionals, book personalized sessions, 
                and achieve your fitness goals with expert guidance and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => router.push('/auth/register')}
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button
                      onClick={() => router.push('/trainers')}
                      className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Browse Trainers
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push('/trainers')}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Find Trainers
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Dumbbell className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Transform Your Life</h3>
                  <p className="text-blue-100">
                    Join thousands of people who have achieved their fitness goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FormaFit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals with professional guidance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their lives with professional fitness training
          </p>
          {!isAuthenticated ? (
            <button
              onClick={() => router.push('/auth/register')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </button>
          ) : (
            <button
              onClick={() => router.push('/trainers')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Find Your Trainer
            </button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
