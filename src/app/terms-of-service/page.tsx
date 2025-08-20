import React from 'react'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700">
                  Welcome to FormaFit. These Terms of Service govern your use of our fitness training platform. By using our Service, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. User Accounts
                </h2>
                <p className="text-gray-700 mb-4">
                  To access our Service, you must create an account and provide accurate information. You are responsible for maintaining account security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Trainer Responsibilities
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Maintain valid fitness certifications and insurance</li>
                  <li>Provide accurate qualifications and experience</li>
                  <li>Maintain professional conduct during sessions</li>
                  <li>Respect client privacy and confidentiality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Client Responsibilities
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate health information</li>
                  <li>Consult healthcare providers before training</li>
                  <li>Arrive on time for sessions</li>
                  <li>Provide notice for cancellations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Booking and Cancellation
                </h2>
                <p className="text-gray-700 mb-4">
                  Bookings require trainer approval and payment. 24-hour notice required for cancellations. Late cancellations may result in charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Payment Terms
                </h2>
                <p className="text-gray-700">
                  All payments processed securely through our platform. Fees are non-refundable except as specified in our refund policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Privacy and Data
                </h2>
                <p className="text-gray-700">
                  Your privacy is protected by our Privacy Policy. By using our Service, you consent to data collection as described.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Prohibited Activities
                </h2>
                <p className="text-gray-700">
                  Users may not violate laws, infringe rights, harass others, upload malicious content, or attempt unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Disclaimers
                </h2>
                <p className="text-gray-700 mb-4">
                  Service provided "as is" without warranties. Fitness training involves risks. We are not responsible for injuries or health issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Limitation of Liability
                </h2>
                <p className="text-gray-700">
                  FormaFit shall not be liable for indirect, incidental, or consequential damages. Total liability limited to amounts paid for Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Termination
                </h2>
                <p className="text-gray-700">
                  We may terminate accounts at any time. Upon termination, access to Service ceases immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  12. Changes to Terms
                </h2>
                <p className="text-gray-700">
                  We may modify these Terms at any time. Continued use constitutes acceptance of updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  13. Contact Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>FormaFit</strong><br />
                    Email: legal@formafit.com<br />
                    Address: [Your Business Address]<br />
                    Phone: [Your Phone Number]
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="flex space-x-6">
                <Link 
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
