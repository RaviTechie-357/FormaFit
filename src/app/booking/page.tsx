import React from 'react'
import Link from 'next/link'

export default function BookingPage({ searchParams }: { searchParams?: { trainerId?: string } }) {
  const trainerId = searchParams?.trainerId

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/trainers" className="text-blue-600 hover:text-blue-800">← Back to Trainers</Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book a Session</h1>
          {trainerId ? (
            <p className="text-gray-600 mb-6">Booking for trainer ID: <span className="font-medium">{trainerId}</span></p>
          ) : (
            <p className="text-gray-600 mb-6">Select a trainer to proceed with booking.</p>
          )}

          <p className="text-gray-700">
            This is a placeholder booking page. Would you like me to wire this up with a full booking form and flow?
          </p>
        </div>
      </div>
    </div>
  )
}


