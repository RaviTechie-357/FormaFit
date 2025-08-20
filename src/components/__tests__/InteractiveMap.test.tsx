import { render, screen } from '@testing-library/react'
import InteractiveMap from '../InteractiveMap'

// Mock the Google Maps loader
jest.mock('@googlemaps/js-api-loader', () => ({
  Loader: jest.fn().mockImplementation(() => ({
    load: jest.fn().mockRejectedValue(new Error('API key not configured'))
  }))
}))

describe('InteractiveMap', () => {
  it('renders loading state initially', () => {
    render(<InteractiveMap />)
    expect(screen.getByText('Loading interactive map...')).toBeInTheDocument()
  })

  it('renders error state when API key is not configured', async () => {
    render(<InteractiveMap />)
    
    // Wait for the error state to appear
    const errorElement = await screen.findByText('FormaFit Headquarters')
    expect(errorElement).toBeInTheDocument()
  })

  it('displays the correct address', async () => {
    const testAddress = '123 Test Street, Test City, TC 12345'
    render(<InteractiveMap address={testAddress} />)
    
    const addressElement = await screen.findByText(testAddress)
    expect(addressElement).toBeInTheDocument()
  })

  it('shows office hours in fallback view', async () => {
    render(<InteractiveMap />)
    
    const officeHours = await screen.findByText(/Office Hours:/)
    expect(officeHours).toBeInTheDocument()
    expect(screen.getByText(/Monday - Friday: 9:00 AM - 6:00 PM/)).toBeInTheDocument()
  })

  it('applies custom height class', () => {
    render(<InteractiveMap height="h-96" />)
    
    // The component should have the custom height class applied
    const container = screen.getByText('Loading interactive map...').closest('div')
    expect(container).toHaveClass('h-96')
  })
})
