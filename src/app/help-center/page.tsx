'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  BookOpen, 
  Video, 
  FileText,
  Users,
  CreditCard,
  Calendar,
  Shield,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Settings,
  User,
  Target,
  TrendingUp,
  Award
} from 'lucide-react'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'account', name: 'Account & Billing', icon: User },
    { id: 'booking', name: 'Bookings & Sessions', icon: Calendar },
    { id: 'trainers', name: 'Finding Trainers', icon: Users },
    { id: 'payments', name: 'Payments & Pricing', icon: CreditCard },
    { id: 'safety', name: 'Safety & Security', icon: Shield }
  ]

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Click the "Get Started" button on our homepage, fill in your details, and choose whether you\'re a client looking for a trainer or a trainer offering services. You\'ll receive a confirmation email to verify your account.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'If you\'ve forgotten your password, click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password securely.'
    },
    {
      id: 3,
      category: 'booking',
      question: 'How do I book a session with a trainer?',
      answer: 'Browse our trainer directory, view their profiles, and click "Book Session" on any trainer you\'re interested in. Select your preferred date and time, and complete the booking process. You\'ll receive a confirmation email with session details.'
    },
    {
      id: 4,
      category: 'booking',
      question: 'Can I cancel or reschedule a session?',
      answer: 'Yes, you can cancel or reschedule sessions up to 24 hours before the scheduled time. Go to your dashboard, find the session in your bookings, and use the cancel or reschedule option. Late cancellations may be subject to the trainer\'s cancellation policy.'
    },
    {
      id: 5,
      category: 'trainers',
      question: 'How do I find the right trainer for me?',
      answer: 'Use our search filters to find trainers by location, specialization, price range, and availability. Read their profiles, reviews, and ratings to find someone who matches your fitness goals and preferences.'
    },
    {
      id: 6,
      category: 'trainers',
      question: 'Are all trainers certified?',
      answer: 'Yes, all trainers on FormaFit are required to have valid fitness certifications from recognized organizations like NASM, ACE, ISSA, or equivalent. We verify all certifications and conduct background checks.'
    },
    {
      id: 7,
      category: 'payments',
      question: 'How do payments work?',
      answer: 'Payments are processed securely through our platform. You can pay using credit cards, debit cards, or digital wallets. Payment is processed after each session is completed, and trainers receive their earnings within 3-5 business days.'
    },
    {
      id: 8,
      category: 'payments',
      question: 'What are the pricing options?',
      answer: 'Pricing varies by trainer and session type. Most trainers offer individual sessions, packages, and monthly memberships. Prices are clearly displayed on each trainer\'s profile, and you can filter by price range when searching.'
    },
    {
      id: 9,
      category: 'safety',
      question: 'How do you ensure trainer safety and quality?',
      answer: 'We maintain strict quality standards including certification verification, background checks, and ongoing monitoring. All trainers are required to have liability insurance and professional references. We also have a review system to maintain quality.'
    },
    {
      id: 10,
      category: 'safety',
      question: 'What if I have a problem with a trainer?',
      answer: 'If you experience any issues, contact our support team immediately. We take all complaints seriously and will investigate thoroughly. You can also leave honest reviews to help other users make informed decisions.'
    }
  ]

  const helpTopics = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of using FormaFit',
      link: '#',
      color: 'text-blue-600'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      link: '#',
      color: 'text-purple-600'
    },
    {
      icon: FileText,
      title: 'User Manual',
      description: 'Detailed documentation',
      link: '#',
      color: 'text-green-600'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      link: '#',
      color: 'text-orange-600'
    }
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      action: 'Start Chat',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'text-green-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
      color: 'text-purple-600'
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    activeCategory === 'all' || faq.category === activeCategory
  ).filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers to your questions, learn how to use FormaFit, and get the support you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Topics */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Help Topics</h2>
            <p className="text-xl text-gray-600">
              Get started with these helpful resources
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4`}>
                  <topic.icon className={`w-6 h-6 ${topic.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <Link href={topic.link} className={`inline-flex items-center ${topic.color} hover:opacity-80 font-medium`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-lg">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse our categories above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">
              Our support team is here to help you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-2">{method.description}</p>
                <p className="text-sm text-gray-500 mb-4">{method.availability}</p>
                <button className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors`}>
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-xl text-gray-600">
              Explore more helpful content and guides
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">For Clients</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• How to find the perfect trainer</li>
                <li>• Booking your first session</li>
                <li>• Understanding pricing</li>
                <li>• Safety guidelines</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">For Trainers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Setting up your profile</li>
                <li>• Managing bookings</li>
                <li>• Payment processing</li>
                <li>• Growing your business</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Best Practices</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Communication tips</li>
                <li>• Session preparation</li>
                <li>• Goal setting</li>
                <li>• Progress tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is ready to help you with any questions or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Support
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
