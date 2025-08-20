import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TrainersPage from '../page'

// Mock the mock data
const mockTrainers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/60/60',
    rating: 4.9,
    totalReviews: 127,
    hourlyRate: 75,
    location: 'New York, NY',
    specializations: ['Weight Training', 'Cardio', 'Nutrition'],
    experience: 8,
    bio: 'Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals.',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/api/placeholder/60/60',
    rating: 4.8,
    totalReviews: 89,
    hourlyRate: 65,
    location: 'Los Angeles, CA',
    specializations: ['Yoga', 'Pilates', 'Flexibility'],
    experience: 5,
    bio: 'Yoga and Pilates specialist focused on flexibility and mindfulness training.',
    isAvailable: true
  }
]

describe('TrainersPage', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('renders trainers page with search functionality', () => {
      render(<TrainersPage />)
      
      // Check if search input is present
      expect(screen.getByPlaceholderText(/search trainers/i)).toBeInTheDocument()
      
      // Check if filter options are present
      expect(screen.getByText(/specialization/i)).toBeInTheDocument()
      expect(screen.getByText(/price range/i)).toBeInTheDocument()
      
      // Check if trainers are displayed
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
    })

    test('displays trainer information correctly', () => {
      render(<TrainersPage />)
      
      // Check trainer details
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('New York, NY')).toBeInTheDocument()
      expect(screen.getByText('$75/hr')).toBeInTheDocument()
      expect(screen.getByText('4.9')).toBeInTheDocument()
      expect(screen.getByText('(127 reviews)')).toBeInTheDocument()
    })

    test('shows trainer specializations', () => {
      render(<TrainersPage />)
      
      expect(screen.getByText('Weight Training')).toBeInTheDocument()
      expect(screen.getByText('Cardio')).toBeInTheDocument()
      expect(screen.getByText('Nutrition')).toBeInTheDocument()
      expect(screen.getByText('Yoga')).toBeInTheDocument()
      expect(screen.getByText('Pilates')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    test('filters trainers by name', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const searchInput = screen.getByPlaceholderText(/search trainers/i)
      
      // Search for Sarah
      await user.type(searchInput, 'Sarah')
      
      // Should show Sarah but not Mike
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.queryByText('Mike Chen')).not.toBeInTheDocument()
    })

    test('filters trainers by location', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const searchInput = screen.getByPlaceholderText(/search trainers/i)
      
      // Search by location
      await user.type(searchInput, 'New York')
      
      // Should show Sarah but not Mike
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.queryByText('Mike Chen')).not.toBeInTheDocument()
    })

    test('clears search results when input is cleared', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const searchInput = screen.getByPlaceholderText(/search trainers/i)
      
      // Search for Sarah
      await user.type(searchInput, 'Sarah')
      expect(screen.queryByText('Mike Chen')).not.toBeInTheDocument()
      
      // Clear search
      await user.clear(searchInput)
      
      // Should show both trainers again
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
    })
  })

  describe('Filtering', () => {
    test('filters by specialization', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const specializationSelect = screen.getByLabelText(/specialization/i)
      
      // Select Yoga specialization
      await user.selectOptions(specializationSelect, 'Yoga')
      
      // Should show Mike (has Yoga) but not Sarah
      expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument()
      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
    })

    test('filters by price range', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const priceSelect = screen.getByLabelText(/price range/i)
      
      // Select low price range (≤ $60)
      await user.selectOptions(priceSelect, 'low')
      
      // Should show Mike ($65) but not Sarah ($75)
      expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument()
      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
    })

    test('combines multiple filters', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const searchInput = screen.getByPlaceholderText(/search trainers/i)
      const specializationSelect = screen.getByLabelText(/specialization/i)
      
      // Search for "Mike" and select "Yoga" specialization
      await user.type(searchInput, 'Mike')
      await user.selectOptions(specializationSelect, 'Yoga')
      
      // Should show Mike
      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
      expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument()
    })
  })

  describe('Sorting', () => {
    test('sorts trainers by rating', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const sortSelect = screen.getByLabelText(/sort by/i)
      
      // Sort by rating (highest first)
      await user.selectOptions(sortSelect, 'rating')
      
      // Sarah should appear first (4.9 rating vs 4.8)
      const trainerCards = screen.getAllByTestId('trainer-card')
      expect(trainerCards[0]).toHaveTextContent('Sarah Johnson')
    })

    test('sorts trainers by price', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const sortSelect = screen.getByLabelText(/sort by/i)
      
      // Sort by price (lowest first)
      await user.selectOptions(sortSelect, 'price')
      
      // Mike should appear first ($65 vs $75)
      const trainerCards = screen.getAllByTestId('trainer-card')
      expect(trainerCards[0]).toHaveTextContent('Mike Chen')
    })
  })

  describe('Interactive Elements', () => {
    test('shows book session button for available trainers', () => {
      render(<TrainersPage />)
      
      // Check for book session buttons
      const bookButtons = screen.getAllByText(/book session/i)
      expect(bookButtons.length).toBeGreaterThan(0)
    })

    test('shows view profile link for each trainer', () => {
      render(<TrainersPage />)
      
      // Check for view profile links
      const profileLinks = screen.getAllByText(/view profile/i)
      expect(profileLinks.length).toBeGreaterThan(0)
    })

    test('displays availability status', () => {
      render(<TrainersPage />)
      
      // Check for availability indicators
      expect(screen.getByText(/available/i)).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    test('adapts to different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<TrainersPage />)
      
      // Should still show all essential elements
      expect(screen.getByPlaceholderText(/search trainers/i)).toBeInTheDocument()
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('handles empty search results gracefully', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const searchInput = screen.getByPlaceholderText(/search trainers/i)
      
      // Search for non-existent trainer
      await user.type(searchInput, 'NonExistentTrainer')
      
      // Should show no results message
      expect(screen.getByText(/no trainers found/i)).toBeInTheDocument()
    })

    test('handles filter with no results', async () => {
      const user = userEvent.setup()
      render(<TrainersPage />)
      
      const specializationSelect = screen.getByLabelText(/specialization/i)
      
      // Select a specialization that no trainer has
      await user.selectOptions(specializationSelect, 'Swimming')
      
      // Should show no results message
      expect(screen.getByText(/no trainers found/i)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    test('renders quickly with large dataset', () => {
      const startTime = performance.now()
      
      render(<TrainersPage />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render in under 100ms
      expect(renderTime).toBeLessThan(100)
    })
  })
})
