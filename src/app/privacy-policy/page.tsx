'use client'

import Link from 'next/link'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Users, 
  Globe, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'December 15, 2024'

  const dataWeCollect = [
    {
      category: 'Personal Information',
      items: [
        'Name, email address, and phone number',
        'Date of birth and gender',
        'Profile information and preferences',
        'Emergency contact information'
      ]
    },
    {
      category: 'Fitness Information',
      items: [
        'Fitness goals and objectives',
        'Health and medical information',
        'Workout preferences and history',
        'Progress tracking data'
      ]
    },
    {
      category: 'Payment Information',
      items: [
        'Credit card and payment details',
        'Billing address and tax information',
        'Transaction history and receipts',
        'Subscription and membership data'
      ]
    },
    {
      category: 'Usage Information',
      items: [
        'App usage and interaction data',
        'Session booking and attendance',
        'Communication with trainers',
        'Device and browser information'
      ]
    }
  ]

  const howWeUseData = [
    {
      purpose: 'Service Provision',
      description: 'To provide our fitness platform services, process bookings, and facilitate trainer-client connections.'
    },
    {
      purpose: 'Communication',
      description: 'To send important updates, confirmations, and respond to your inquiries and support requests.'
    },
    {
      purpose: 'Personalization',
      description: 'To customize your experience, recommend trainers, and provide relevant fitness content.'
    },
    {
      purpose: 'Payment Processing',
      description: 'To process payments, handle billing, and manage financial transactions securely.'
    },
    {
      purpose: 'Safety and Security',
      description: 'To verify trainer credentials, conduct background checks, and ensure platform safety.'
    },
    {
      purpose: 'Improvement',
      description: 'To analyze usage patterns, improve our services, and develop new features.'
    }
  ]

  const dataSharing = [
    {
      party: 'Trainers and Clients',
      description: 'We share necessary information between trainers and clients to facilitate sessions and communication.',
      limited: true
    },
    {
      party: 'Service Providers',
      description: 'We work with trusted third-party providers for payment processing, hosting, and analytics.',
      limited: true
    },
    {
      party: 'Legal Requirements',
      description: 'We may disclose information when required by law or to protect our rights and safety.',
      limited: true
    },
    {
      party: 'Business Transfers',
      description: 'In case of merger or acquisition, user information may be transferred to the new entity.',
      limited: true
    }
  ]

  const userRights = [
    {
      right: 'Access Your Data',
      description: 'Request a copy of all personal information we have about you.',
      icon: Eye
    },
    {
      right: 'Update Information',
      description: 'Correct or update your personal information at any time.',
      icon: FileText
    },
    {
      right: 'Delete Account',
      description: 'Request deletion of your account and associated data.',
      icon: Database
    },
    {
      right: 'Data Portability',
      description: 'Export your data in a machine-readable format.',
      icon: Globe
    },
    {
      right: 'Opt-Out',
      description: 'Unsubscribe from marketing communications and data sharing.',
      icon: Mail
    },
    {
      right: 'Complaints',
      description: 'File complaints with relevant data protection authorities.',
      icon: AlertTriangle
    }
  ]

  const securityMeasures = [
    'End-to-end encryption for sensitive data',
    'Regular security audits and penetration testing',
    'Secure data centers with 24/7 monitoring',
    'Multi-factor authentication for accounts',
    'Regular software updates and patches',
    'Employee background checks and training',
    'Incident response and breach notification procedures'
  ]

  const cookies = [
    {
      type: 'Essential Cookies',
      purpose: 'Required for basic website functionality and security.',
      examples: 'Authentication, session management, security features'
    },
    {
      type: 'Performance Cookies',
      purpose: 'Help us understand how visitors interact with our website.',
      examples: 'Analytics, error tracking, performance monitoring'
    },
    {
      type: 'Functional Cookies',
      purpose: 'Remember your preferences and provide enhanced features.',
      examples: 'Language settings, theme preferences, form data'
    },
    {
      type: 'Marketing Cookies',
      purpose: 'Used for advertising and marketing purposes.',
      examples: 'Targeted ads, social media integration, remarketing'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-blue-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Link href="#information-collection" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Information We Collect
                </Link>
                <Link href="#how-we-use" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  How We Use Your Information
                </Link>
                <Link href="#data-sharing" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Information Sharing
                </Link>
                <Link href="#data-security" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Data Security
                </Link>
              </div>
              <div className="space-y-2">
                <Link href="#your-rights" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Your Rights
                </Link>
                <Link href="#cookies" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Cookies and Tracking
                </Link>
                <Link href="#children" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Children's Privacy
                </Link>
                <Link href="#contact" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Collection */}
      <div id="information-collection" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-xl text-gray-600">
                We collect various types of information to provide and improve our services
              </p>
            </div>

            <div className="space-y-8">
              {dataWeCollect.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div id="how-we-use" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-xl text-gray-600">
                We use your information for specific purposes to provide better services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {howWeUseData.map((use, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{use.purpose}</h3>
                  <p className="text-gray-600">{use.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Information Sharing */}
      <div id="data-sharing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-xl text-gray-600">
                We are committed to protecting your privacy and only share information when necessary
              </p>
            </div>

            <div className="space-y-6">
              {dataSharing.map((share, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{share.party}</h3>
                      <p className="text-gray-600">{share.description}</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <Lock className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Limited Sharing</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Do Not Sell Your Data</h3>
              <p className="text-gray-600">
                FormaFit does not sell, rent, or trade your personal information to third parties for marketing purposes. 
                Your data is used solely to provide our services and improve your experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Security */}
      <div id="data-security" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Lock className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-xl text-gray-600">
                We implement industry-standard security measures to protect your information
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {securityMeasures.map((measure, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{measure}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Commitment</h3>
              <p className="text-gray-600">
                We continuously monitor and update our security practices to ensure your data remains protected. 
                In the unlikely event of a data breach, we will notify affected users within 72 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div id="your-rights" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-xl text-gray-600">
                You have control over your personal information and how it's used
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userRights.map((right, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <right.icon className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">{right.right}</h3>
                  </div>
                  <p className="text-gray-600">{right.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise Your Rights</h3>
              <p className="text-gray-600 mb-4">
                To exercise any of these rights, please contact us using the information provided below. 
                We will respond to your request within 30 days.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cookies and Tracking */}
      <div id="cookies" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-xl text-gray-600">
                We use cookies and similar technologies to enhance your experience
              </p>
            </div>

            <div className="space-y-6">
              {cookies.map((cookie, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cookie.type}</h3>
                  <p className="text-gray-600 mb-3">{cookie.purpose}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Examples:</strong> {cookie.examples}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Management</h3>
              <p className="text-gray-600">
                You can control cookie settings through your browser preferences. However, disabling certain cookies 
                may affect the functionality of our website and services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Children's Privacy */}
      <div id="children" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-xl text-gray-600">
                We are committed to protecting the privacy of children
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Age Requirements</h3>
                <p className="text-gray-600 mb-4">
                  FormaFit is not intended for children under the age of 13. We do not knowingly collect personal 
                  information from children under 13. If you are a parent or guardian and believe your child has 
                  provided us with personal information, please contact us immediately.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Teen Users (13-17)</h3>
                <p className="text-gray-600 mb-4">
                  Users between the ages of 13 and 17 must have parental consent to use our services. We may 
                  require additional verification for users in this age group.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Parental Rights</h3>
                <p className="text-gray-600">
                  Parents have the right to review, delete, and refuse further collection of their child's 
                  personal information. To exercise these rights, please contact us using the information below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div id="contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About This Policy?</h2>
            <p className="text-xl text-blue-100 mb-8">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-100">privacy@formafit.com</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-blue-100">1-800-FORM-FIT</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <Calendar className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-blue-100">Within 30 days</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Contact Support
              </Link>
              <Link
                href="/help-center"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">
              This Privacy Policy is effective as of {lastUpdated}. We may update this policy from time to time. 
              We will notify you of any material changes by posting the new Privacy Policy on this page and 
              updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
