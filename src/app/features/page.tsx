'use client'

import { useState } from 'react'
import { 
  Dumbbell, 
  Users, 
  Star, 
  Calendar, 
  Target, 
  Award,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  MapPin,
  MessageCircle,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'

interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  category: 'core' | 'advanced' | 'premium'
}

const features: Feature[] = [
  {
    id: 'expert-trainers',
    icon: <Users className="w-8 h-8" />,
    title: 'Expert Trainers',
    description: 'Connect with certified fitness professionals who specialize in your specific goals and needs.',
    benefits: [
      'Verified certifications and credentials',
      'Specialized expertise in various fitness areas',
      'Background-checked professionals',
      'Continuous education and training'
    ],
    category: 'core'
  },
  {
    id: 'flexible-scheduling',
    icon: <Calendar className="w-8 h-8" />,
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule with real-time availability and instant confirmation.',
    benefits: [
      '24/7 booking availability',
      'Real-time calendar integration',
      'Instant booking confirmation',
      'Easy rescheduling options'
    ],
    category: 'core'
  },
  {
    id: 'goal-tracking',
    icon: <Target className="w-8 h-8" />,
    title: 'Goal Tracking',
    description: 'Set and track your fitness goals with personalized progress monitoring and analytics.',
    benefits: [
      'Personalized goal setting',
      'Progress visualization',
      'Milestone celebrations',
      'Data-driven insights'
    ],
    category: 'core'
  },
  {
    id: 'verified-reviews',
    icon: <Star className="w-8 h-8" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real clients to choose the best trainer for your needs.',
    benefits: [
      'Authentic client testimonials',
      'Detailed rating system',
      'Photo and video reviews',
      'Review verification process'
    ],
    category: 'core'
  },
  {
    id: 'community-support',
    icon: <Heart className="w-8 h-8" />,
    title: 'Community Support',
    description: 'Join a community of fitness enthusiasts and stay motivated with group challenges.',
    benefits: [
      'Fitness community forums',
      'Group challenges and events',
      'Peer motivation system',
      'Success story sharing'
    ],
    category: 'advanced'
  },
  {
    id: 'certified-professionals',
    icon: <Award className="w-8 h-8" />,
    title: 'Certified Professionals',
    description: 'All trainers are verified and certified in their specialties with ongoing education.',
    benefits: [
      'Industry-standard certifications',
      'Regular credential verification',
      'Specialized training programs',
      'Professional development tracking'
    ],
    category: 'core'
  },
  {
    id: 'real-time-messaging',
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Real-time Messaging',
    description: 'Communicate directly with your trainer through our secure messaging platform.',
    benefits: [
      'Instant messaging with trainers',
      'File and photo sharing',
      'Message history tracking',
      'Push notifications'
    ],
    category: 'advanced'
  },
  {
    id: 'progress-analytics',
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Progress Analytics',
    description: 'Track your fitness journey with detailed analytics and performance metrics.',
    benefits: [
      'Comprehensive progress tracking',
      'Performance analytics',
      'Trend analysis',
      'Customizable reports'
    ],
    category: 'advanced'
  },
  {
    id: 'mobile-app',
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Mobile App',
    description: 'Access your fitness journey anywhere with our feature-rich mobile application.',
    benefits: [
      'iOS and Android support',
      'Offline functionality',
      'Push notifications',
      'Seamless sync across devices'
    ],
    category: 'advanced'
  },
  {
    id: 'global-reach',
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Reach',
    description: 'Connect with trainers worldwide through virtual sessions and remote coaching.',
    benefits: [
      'Virtual training sessions',
      'International trainer access',
      'Multi-language support',
      'Global community'
    ],
    category: 'premium'
  },
  {
    id: 'secure-payments',
    icon: <Lock className="w-8 h-8" />,
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with multiple payment options and fraud protection.',
    benefits: [
      'Encrypted payment processing',
      'Multiple payment methods',
      'Fraud protection',
      'Secure transaction history'
    ],
    category: 'core'
  },
  {
    id: 'insurance-coverage',
    icon: <Shield className="w-8 h-8" />,
    title: 'Insurance Coverage',
    description: 'Comprehensive insurance coverage for all training sessions and activities.',
    benefits: [
      'Liability insurance',
      'Accident coverage',
      'Equipment protection',
      'Peace of mind'
    ],
    category: 'premium'
  }
]

const categories = [
  { id: 'all', name: 'All Features', count: features.length },
  { id: 'core', name: 'Core Features', count: features.filter(f => f.category === 'core').length },
  { id: 'advanced', name: 'Advanced Features', count: features.filter(f => f.category === 'advanced').length },
  { id: 'premium', name: 'Premium Features', count: features.filter(f => f.category === 'premium').length }
]

const stats = [
  { number: '500+', label: 'Certified Trainers', icon: Users },
  { number: '10K+', label: 'Happy Clients', icon: Heart },
  { number: '50K+', label: 'Sessions Completed', icon: Calendar },
  { number: '4.8', label: 'Average Rating', icon: Star }
]

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Zap className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Platform Features</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the powerful tools and features that make FormaFit the ultimate platform 
              for connecting with fitness professionals and achieving your goals.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedFeature(feature)}
            >
              {/* Feature Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    {feature.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feature.category === 'core' 
                      ? 'bg-green-100 text-green-800'
                      : feature.category === 'advanced'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>

              {/* Feature Benefits */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {feature.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                  {feature.benefits.length > 3 && (
                    <li className="text-sm text-blue-600 font-medium">
                      +{feature.benefits.length - 3} more benefits
                    </li>
                  )}
                </ul>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No features found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with FormaFit in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Trainer</h3>
              <p className="text-gray-600">
                Browse our directory of certified trainers, read reviews, and find the perfect match for your fitness goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Your Session</h3>
              <p className="text-gray-600">
                Schedule your training session at a time that works for you with our flexible booking system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Achieve Your Goals</h3>
              <p className="text-gray-600">
                Work with your trainer, track your progress, and transform your fitness journey with our comprehensive tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already transforming their fitness journey with FormaFit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trainers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Browse Trainers
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Feature Details */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    {selectedFeature.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedFeature.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedFeature.category === 'core' 
                        ? 'bg-green-100 text-green-800'
                        : selectedFeature.category === 'advanced'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedFeature.category.charAt(0).toUpperCase() + selectedFeature.category.slice(1)} Feature
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedFeature.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">All Benefits</h3>
                  <ul className="space-y-2">
                    {selectedFeature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/trainers"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                  >
                    Find a Trainer to Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

