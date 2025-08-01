'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { forgotPassword, verifyResetCode } from '@/redux/slices/authSlice'

export default function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error, successMessage, resetStep } = useSelector(
    (state: RootState) => state.auth
  )

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(forgotPassword(email))
  }

  const handleCodeVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(verifyResetCode({ email, code }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          {resetStep === 'emailSent'
            ? 'Enter the verification code sent to your email.'
            : 'Enter your email and we’ll send reset instructions.'}
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

        {resetStep !== 'emailSent' ? (
          <form onSubmit={handleEmailSubmit}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="you@example.com"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Get Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeVerify}>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="XXXX"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
