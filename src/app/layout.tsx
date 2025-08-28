import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import { Shots } from "./dashboard/Shots"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FormaFit - Find Your Perfect Trainer',
  description: 'Connect with certified fitness trainers and achieve your fitness goals',
  keywords: 'fitness, trainer, workout, gym, personal training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <Header /> 
            <main className="pt-16">
              {children}
              
            </main>
          

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
