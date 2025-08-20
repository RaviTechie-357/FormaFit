'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  Award, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
  CreditCard,
  Heart,
  Target,
  BookOpen,
  Video,
  Headphones,
  FileText
} from 'lucide-react'

export default function BecomeTrainerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn More',
      description: 'Set your own rates and keep up to 85% of your earnings',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Work when you want, where you want - full control over your time',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Build Your Client Base',
      description: 'Access thousands of potential clients looking for trainers',
      color: 'text-purple-600'
    },
    {
      icon: Star,
      title: 'Grow Your Brand',
      description: 'Create a professional profile and showcase your expertise',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Get paid reliably with our secure payment system',
      color: 'text-indigo-600'
    },
    {
      icon: TrendingUp,
      title: 'Scale Your Business',
      description: 'Tools and resources to help you grow your fitness business',
      color: 'text-orange-600'
    }
  ]

  const features = [
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your earnings, client progress, and business growth'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Manage your availability and bookings with ease'
    },
    {
      icon: MessageCircle,
      title: 'Client Communication',
      description: 'Built-in messaging and video call capabilities'
    },
    {
      icon: FileText,
      title: 'Progress Tracking',
      description: 'Help clients track their fitness journey and goals'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Secure, automated payment collection and disbursement'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Manage your business on the go with our mobile app'
    }
  ]

  const requirements = [
    'Valid fitness certification (NASM, ACE, ISSA, or equivalent)',
    'Minimum 2 years of personal training experience',
    'Liability insurance coverage',
    'Background check clearance',
    'Professional references',
    'Commitment to ongoing education'
  ]

  const process = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Complete our simple application form with your credentials',
      icon: FileText
    },
    {
      step: 2,
      title: 'Verification',
      description: 'We verify your certifications and conduct background checks',
      icon: Shield
    },
    {
      step: 3,
      title: 'Profile Setup',
      description: 'Create your professional profile and set your rates',
      icon: Users
    },
    {
      step: 4,
      title: 'Start Training',
      description: 'Begin accepting clients and growing your business',
      icon: Target
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Personal Trainer',
      experience: '3 years on FormaFit',
      content: 'FormaFit has transformed my business. I\'ve doubled my income while working fewer hours, and the platform makes everything so easy.',
      rating: 5,
      earnings: '$8,500/month'
    },
    {
      name: 'Mike Chen',
      role: 'Strength Coach',
      experience: '2 years on FormaFit',
      content: 'The client quality is amazing. I work with motivated people who are serious about their fitness goals.',
      rating: 5,
      earnings: '$12,000/month'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Yoga Instructor',
      experience: '1 year on FormaFit',
      content: 'I love the flexibility. I can teach from home or travel while still maintaining my client base.',
      rating: 5,
      earnings: '$6,200/month'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Become a FormaFit Trainer</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join thousands of successful fitness professionals who are earning more, 
              working smarter, and helping clients achieve their goals with FormaFit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/auth/register')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                See Earnings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Active Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">$2,500</div>
              <div className="text-gray-600">Average Monthly Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Trainer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trainers Choose FormaFit</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build a successful fitness business in one platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Tools for Your Business</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tools designed to help you succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements to Join</h2>
              <p className="text-lg text-gray-600 mb-8">
                We maintain high standards to ensure our clients get the best possible training experience.
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center">
                <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Standards</h3>
                <p className="text-gray-600">
                  We carefully vet all trainers to ensure they meet our high standards 
                  for certification, experience, and professionalism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Trainers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from successful trainers who have transformed their careers with FormaFit
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.experience}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{testimonial.earnings}</div>
                    <div className="text-sm text-gray-600">monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful trainers who are building their dream business with FormaFit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth/register')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now - It's Free
            </button>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
