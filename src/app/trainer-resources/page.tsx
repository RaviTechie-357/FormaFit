'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  Users, 
  Target, 
  Calendar, 
  DollarSign,
  Award,
  Star,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  ExternalLink,
  Clock,
  Bookmark,
  Share2
} from 'lucide-react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  description: string
  type: 'guide' | 'video' | 'template' | 'tool' | 'certification'
  category: 'business' | 'training' | 'marketing' | 'technology' | 'wellness'
  duration?: string
  downloads?: number
  rating?: number
  isNew?: boolean
  isPremium?: boolean
  icon: React.ReactNode
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Complete Business Setup Guide',
    description: 'Step-by-step guide to setting up your personal training business, including legal requirements, insurance, and business structure.',
    type: 'guide',
    category: 'business',
    duration: '45 min read',
    downloads: 1247,
    rating: 4.9,
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Client Assessment Templates',
    description: 'Professional templates for initial client assessments, progress tracking, and goal setting.',
    type: 'template',
    category: 'training',
    downloads: 892,
    rating: 4.8,
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Marketing Masterclass Series',
    description: '10-part video series covering social media marketing, client acquisition, and brand building.',
    type: 'video',
    category: 'marketing',
    duration: '2.5 hours',
    downloads: 567,
    rating: 4.9,
    isPremium: true,
    icon: <Video className="w-6 h-6" />
  },
  {
    id: '4',
    title: 'Nutrition Certification Course',
    description: 'Comprehensive nutrition certification to expand your service offerings and increase your value.',
    type: 'certification',
    category: 'wellness',
    duration: '40 hours',
    downloads: 234,
    rating: 4.7,
    isPremium: true,
    icon: <Award className="w-6 h-6" />
  },
  {
    id: '5',
    title: 'Workout Program Builder',
    description: 'Interactive tool to create personalized workout programs for different client types and goals.',
    type: 'tool',
    category: 'training',
    downloads: 1567,
    rating: 4.8,
    icon: <Target className="w-6 h-6" />
  },
  {
    id: '6',
    title: 'Client Communication Handbook',
    description: 'Best practices for effective client communication, motivation, and relationship building.',
    type: 'guide',
    category: 'business',
    duration: '30 min read',
    downloads: 743,
    rating: 4.6,
    icon: <Users className="w-6 h-6" />
  },
  {
    id: '7',
    title: 'Pricing Strategy Guide',
    description: 'Learn how to price your services competitively while maximizing your income potential.',
    type: 'guide',
    category: 'business',
    duration: '25 min read',
    downloads: 634,
    rating: 4.7,
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    id: '8',
    title: 'Social Media Content Calendar',
    description: 'Monthly content calendar with fitness tips, motivational posts, and engagement strategies.',
    type: 'template',
    category: 'marketing',
    downloads: 445,
    rating: 4.5,
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: '9',
    title: 'Injury Prevention Workshop',
    description: 'Video workshop on preventing common injuries and creating safe, effective training programs.',
    type: 'video',
    category: 'training',
    duration: '1.5 hours',
    downloads: 789,
    rating: 4.8,
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: '10',
    title: 'Technology Integration Guide',
    description: 'How to leverage fitness apps, wearables, and online platforms to enhance your training services.',
    type: 'guide',
    category: 'technology',
    duration: '35 min read',
    downloads: 456,
    rating: 4.6,
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: '11',
    title: 'Client Progress Tracking System',
    description: 'Comprehensive system for tracking client progress, measurements, and achievements.',
    type: 'tool',
    category: 'training',
    downloads: 1123,
    rating: 4.9,
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: '12',
    title: 'Business Growth Strategies',
    description: 'Advanced strategies for scaling your personal training business and increasing revenue.',
    type: 'guide',
    category: 'business',
    duration: '50 min read',
    downloads: 334,
    rating: 4.8,
    isPremium: true,
    icon: <Star className="w-6 h-6" />
  }
]

const categories = [
  { id: 'all', name: 'All Resources', count: resources.length },
  { id: 'business', name: 'Business', count: resources.filter(r => r.category === 'business').length },
  { id: 'training', name: 'Training', count: resources.filter(r => r.category === 'training').length },
  { id: 'marketing', name: 'Marketing', count: resources.filter(r => r.category === 'marketing').length },
  { id: 'technology', name: 'Technology', count: resources.filter(r => r.category === 'technology').length },
  { id: 'wellness', name: 'Wellness', count: resources.filter(r => r.category === 'wellness').length }
]

const resourceTypes = [
  { id: 'all', name: 'All Types', count: resources.length },
  { id: 'guide', name: 'Guides', count: resources.filter(r => r.type === 'guide').length },
  { id: 'video', name: 'Videos', count: resources.filter(r => r.type === 'video').length },
  { id: 'template', name: 'Templates', count: resources.filter(r => r.type === 'template').length },
  { id: 'tool', name: 'Tools', count: resources.filter(r => r.type === 'tool').length },
  { id: 'certification', name: 'Certifications', count: resources.filter(r => r.type === 'certification').length }
]

const stats = [
  { number: '500+', label: 'Resources Available', icon: BookOpen },
  { number: '50K+', label: 'Downloads', icon: Download },
  { number: '4.8', label: 'Average Rating', icon: Star },
  { number: '24/7', label: 'Support', icon: Users }
]

export default function TrainerResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    return matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Trainer Resources</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Access exclusive resources, tools, and guides to grow your personal training business 
              and enhance your professional skills.
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

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
            
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.name} ({type.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedResource(resource)}
            >
              {/* Resource Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    {resource.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {resource.isNew && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        New
                      </span>
                    )}
                    {resource.isPremium && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                
                {/* Resource Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    {resource.duration && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {resource.duration}
                      </div>
                    )}
                    {resource.downloads && (
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads.toLocaleString()}
                      </div>
                    )}
                  </div>
                  {resource.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {resource.rating}
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Actions */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try selecting different filters.</p>
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular and highly-rated resources to help you succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certification Programs</h3>
              <p className="text-gray-600 mb-4">
                Expand your expertise with our comprehensive certification courses
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View Certifications
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with other trainers and share best practices
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                Join Community
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Tools</h3>
              <p className="text-gray-600 mb-4">
                Professional tools to streamline your business operations
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Explore Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Access Premium Resources?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Upgrade to premium membership for exclusive access to advanced courses, 
            business tools, and personalized support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Resource Details */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    {selectedResource.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      {selectedResource.isNew && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          New
                        </span>
                      )}
                      {selectedResource.isPremium && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedResource.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedResource.duration && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      Duration: {selectedResource.duration}
                    </div>
                  )}
                  {selectedResource.downloads && (
                    <div className="flex items-center text-gray-600">
                      <Download className="w-5 h-5 mr-2" />
                      Downloads: {selectedResource.downloads.toLocaleString()}
                    </div>
                  )}
                  {selectedResource.rating && (
                    <div className="flex items-center text-gray-600">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                      Rating: {selectedResource.rating}/5
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resource
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

