'use client'

import { Heart, Target, Users, Award, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Certified Trainers', icon: Users },
    { number: '10K+', label: 'Happy Clients', icon: Heart },
    { number: '50K+', label: 'Sessions Completed', icon: Target },
    { number: '4.8', label: 'Average Rating', icon: Award },
  ]

  const values = [
    {
      title: 'Quality Training',
      description: 'All our trainers are certified professionals with proven track records.',
      icon: Award,
    },
    {
      title: 'Personalized Approach',
      description: 'Every fitness journey is unique. We tailor programs to your specific goals.',
      icon: Target,
    },
    {
      title: 'Community Support',
      description: 'Join a community of like-minded individuals on their fitness journey.',
      icon: Users,
    },
    {
      title: 'Results Guaranteed',
      description: 'Our proven methods and dedicated trainers ensure you achieve your goals.',
      icon: CheckCircle,
    },
  ]

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Former professional athlete with 15+ years in fitness industry.',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Training',
      bio: 'Certified personal trainer and nutrition specialist.',
      image: '/api/placeholder/120/120',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Technology Lead',
      bio: 'Expert in building platforms that connect people.',
      image: '/api/placeholder/120/120',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About FormaFit</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make fitness accessible, personalized, and effective for everyone. 
              Our platform connects you with certified trainers who understand your unique goals and challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At FormaFit, we believe that everyone deserves access to high-quality fitness training 
                that fits their lifestyle and goals. We've built a platform that removes the barriers 
                between you and your fitness success.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're just starting your fitness journey or you're an experienced athlete 
                looking to take your performance to the next level, our certified trainers are here 
                to guide you every step of the way.
              </p>
              <Link
                href="/trainers"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Find Your Trainer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Choose FormaFit?</h3>
                <p className="text-gray-600">
                  We combine cutting-edge technology with human expertise to deliver 
                  the most effective fitness experience possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and ensure we deliver the best possible experience for our users.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <value.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind FormaFit who are dedicated to transforming the fitness industry.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their lives with FormaFit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Get Started Today
            </Link>
            <Link
              href="/trainers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Browse Trainers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 