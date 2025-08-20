'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { useClientSide } from '../lib/hooks/useClientSide'

// Dynamic import for Google Maps loader
let Loader: any = null
try {
  Loader = require('@googlemaps/js-api-loader').Loader
} catch (error) {
  console.warn('Google Maps API loader not available')
}

interface InteractiveMapProps {
  address?: string
  className?: string
  height?: string
}

export default function InteractiveMap({ 
  address = "123 Fitness Street, New York, NY 10001",
  className = "",
  height = "h-64"
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isClient = useClientSide()

  useEffect(() => {
    if (!isClient) return
    
    const initMap = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if Google Maps loader is available
        if (!Loader) {
          setError('Google Maps API loader not available')
          setIsLoading(false)
          return
        }

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'your_google_maps_api_key_here') {
          setError('Google Maps API key not configured')
          setIsLoading(false)
          return
        }

        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places']
        })

        const google = await loader.load()
        
        if (!mapRef.current) return

        // Geocode the address to get coordinates
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location
            
            const map = new google.maps.Map(mapRef.current!, {
              center: location,
              zoom: 15,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }]
                }
              ]
            })

            // Add marker
            new google.maps.Marker({
              position: location,
              map: map,
              title: 'FormaFit Headquarters',
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#2563eb"/>
                    <path d="M20 8C15.6 8 12 11.6 12 16c0 4.4 8 12 8 12s8-7.6 8-12c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 40)
              }
            })

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 10px; max-width: 200px;">
                  <h3 style="margin: 0 0 5px 0; color: #2563eb; font-weight: bold;">FormaFit</h3>
                  <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Headquarters</p>
                </div>
              `
            })

            // Show info window on marker click
            map.addListener('click', () => {
              infoWindow.open(map, map.getMarkers?.[0])
            })

            setIsLoading(false)
          } else {
            setError('Could not find the address on the map')
            setIsLoading(false)
          }
        })
      } catch (err) {
        console.error('Error loading map:', err)
        setError('Failed to load the map')
        setIsLoading(false)
      }
    }

    initMap()
  }, [address, isClient])

  if (!isClient) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg ${height} flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading interactive map...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we locate FormaFit</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg ${height} flex items-center justify-center ${className} border-2 border-dashed border-blue-200`}>
        <div className="text-center p-6">
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">FormaFit Headquarters</h3>
          <p className="text-gray-600 mb-3">{address}</p>
          <div className="bg-white rounded-lg p-4 shadow-sm max-w-xs mx-auto">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Office Hours:</strong><br />
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
            <p className="text-xs text-gray-500">
              To enable interactive map, add your Google Maps API key to .env.local
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg ${height} flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading interactive map...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we locate FormaFit</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className={`w-full ${height} rounded-lg shadow-sm`}
      />
      <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm font-medium text-gray-900">FormaFit Headquarters</p>
        <p className="text-xs text-gray-600">{address}</p>
      </div>
    </div>
  )
}
