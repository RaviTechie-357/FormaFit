import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import BookingForm from '../components/BookingForm'

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    booking: (state = { loading: false, error: null, success: false }, action) => {
      switch (action.type) {
        case 'booking/createStart':
          return { ...state, loading: true, error: null }
        case 'booking/createSuccess':
          return { ...state, loading: false, success: true }
        case 'booking/createFailure':
          return { ...state, loading: false, error: action.payload }
        default:
          return state
      }
    }
  }
})

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date) => '2024-01-15'),
  addDays: jest.fn((date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)),
  isAfter: jest.fn((date1, date2) => date1 > date2),
  startOfDay: jest.fn((date) => date),
}))

const renderWithProvider = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  )
}

const mockTrainer = {
  id: 'trainer-123',
  name: 'Sarah Johnson',
  hourlyRate: 75,
  specializations: ['Weight Training', 'Cardio'],
  rating: 4.9,
  totalReviews: 127,
  location: 'New York, NY',
  isAvailable: true,
}

describe('BookingForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('renders booking form with trainer information', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      expect(screen.getByText('Book Session with Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('$75/hr')).toBeInTheDocument()
      expect(screen.getByText('New York, NY')).toBeInTheDocument()
      expect(screen.getByText('4.9 (127 reviews)')).toBeInTheDocument()
    })

    test('displays form fields correctly', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/duration/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/session type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /book session/i })).toBeInTheDocument()
    })

    test('shows trainer specializations', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      expect(screen.getByText('Weight Training')).toBeInTheDocument()
      expect(screen.getByText('Cardio')).toBeInTheDocument()
    })

    test('displays total cost calculation', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      // Default 1-hour session should show $75
      expect(screen.getByText('Total Cost: $75')).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    test('validates required fields', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const submitButton = screen.getByRole('button', { name: /book session/i })
      
      // Try to submit without filling required fields
      await user.click(submitButton)
      
      expect(screen.getByText(/date is required/i)).toBeInTheDocument()
      expect(screen.getByText(/time is required/i)).toBeInTheDocument()
    })

    test('validates date is not in the past', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      
      // Set date to yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]
      
      await user.type(dateInput, yesterdayString)
      fireEvent.blur(dateInput)
      
      expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument()
    })

    test('validates time is within business hours', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const timeInput = screen.getByLabelText(/time/i)
      
      // Set time outside business hours (before 6 AM)
      await user.type(timeInput, '05:00')
      fireEvent.blur(timeInput)
      
      expect(screen.getByText(/booking hours are 6:00 AM to 10:00 PM/i)).toBeInTheDocument()
    })

    test('validates duration is within allowed range', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const durationSelect = screen.getByLabelText(/duration/i)
      
      // Select invalid duration (4 hours)
      await user.selectOptions(durationSelect, '4')
      
      expect(screen.getByText(/duration must be between 30 minutes and 3 hours/i)).toBeInTheDocument()
    })

    test('validates session type is selected', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      
      // Try to submit without selecting session type
      const submitButton = screen.getByRole('button', { name: /book session/i })
      await user.click(submitButton)
      
      expect(screen.getByText(/session type is required/i)).toBeInTheDocument()
    })
  })

  describe('Cost Calculation', () => {
    test('calculates cost correctly for different durations', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const durationSelect = screen.getByLabelText(/duration/i)
      
      // Test 30 minutes
      await user.selectOptions(durationSelect, '0.5')
      expect(screen.getByText('Total Cost: $37.50')).toBeInTheDocument()
      
      // Test 1 hour
      await user.selectOptions(durationSelect, '1')
      expect(screen.getByText('Total Cost: $75')).toBeInTheDocument()
      
      // Test 2 hours
      await user.selectOptions(durationSelect, '2')
      expect(screen.getByText('Total Cost: $150')).toBeInTheDocument()
      
      // Test 3 hours
      await user.selectOptions(durationSelect, '3')
      expect(screen.getByText('Total Cost: $225')).toBeInTheDocument()
    })

    test('applies discount for longer sessions', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const durationSelect = screen.getByLabelText(/duration/i)
      
      // Test 3-hour session with 10% discount
      await user.selectOptions(durationSelect, '3')
      
      expect(screen.getByText('Total Cost: $202.50')).toBeInTheDocument()
      expect(screen.getByText('(10% discount applied)')).toBeInTheDocument()
    })
  })

  describe('Date and Time Selection', () => {
    test('disables past dates in date picker', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      
      // Check that min attribute is set to today
      const today = new Date().toISOString().split('T')[0]
      expect(dateInput).toHaveAttribute('min', today)
    })

    test('allows booking up to 30 days in advance', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      
      // Check that max attribute is set to 30 days from today
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 30)
      const maxDateString = maxDate.toISOString().split('T')[0]
      expect(dateInput).toHaveAttribute('max', maxDateString)
    })

    test('updates available time slots based on selected date', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      
      // Set date to tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      
      // Check that time slots are updated
      expect(timeInput).toHaveAttribute('min', '06:00')
      expect(timeInput).toHaveAttribute('max', '22:00')
    })
  })

  describe('Form Submission', () => {
    test('submits form with valid data', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn()
      
      renderWithProvider(<BookingForm trainer={mockTrainer} onSubmit={mockOnSubmit} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      const notesInput = screen.getByLabelText(/notes/i)
      const submitButton = screen.getByRole('button', { name: /book session/i })
      
      // Fill form with valid data
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      await user.type(timeInput, '10:00')
      await user.selectOptions(durationSelect, '1')
      await user.selectOptions(sessionTypeSelect, 'Weight Training')
      await user.type(notesInput, 'First session, beginner level')
      
      // Submit form
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          trainerId: 'trainer-123',
          date: tomorrowString,
          time: '10:00',
          duration: 1,
          sessionType: 'Weight Training',
          notes: 'First session, beginner level',
          totalCost: 75,
        })
      })
    })

    test('shows loading state during submission', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      renderWithProvider(<BookingForm trainer={mockTrainer} onSubmit={mockOnSubmit} />)
      
      // Fill form
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      const submitButton = screen.getByRole('button', { name: /book session/i })
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      await user.type(timeInput, '10:00')
      await user.selectOptions(durationSelect, '1')
      await user.selectOptions(sessionTypeSelect, 'Weight Training')
      
      // Submit form
      await user.click(submitButton)
      
      // Check loading state
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/booking session/i)).toBeInTheDocument()
    })

    test('prevents double submission', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      renderWithProvider(<BookingForm trainer={mockTrainer} onSubmit={mockOnSubmit} />)
      
      // Fill and submit form
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      const submitButton = screen.getByRole('button', { name: /book session/i })
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      await user.type(timeInput, '10:00')
      await user.selectOptions(durationSelect, '1')
      await user.selectOptions(sessionTypeSelect, 'Weight Training')
      
      // Submit form twice quickly
      await user.click(submitButton)
      await user.click(submitButton)
      
      // Should only call onSubmit once
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('Error Handling', () => {
    test('displays booking error messages', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Trainer not available'))
      
      renderWithProvider(<BookingForm trainer={mockTrainer} onSubmit={mockOnSubmit} />)
      
      // Fill and submit form
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      const submitButton = screen.getByRole('button', { name: /book session/i }))
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      await user.type(timeInput, '10:00')
      await user.selectOptions(durationSelect, '1')
      await user.selectOptions(sessionTypeSelect, 'Weight Training')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/trainer not available/i)).toBeInTheDocument()
      })
    })

    test('clears error when user starts editing form', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Booking failed'))
      
      renderWithProvider(<BookingForm trainer={mockTrainer} onSubmit={mockOnSubmit} />)
      
      // Submit form to trigger error
      const submitButton = screen.getByRole('button', { name: /book session/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/booking failed/i)).toBeInTheDocument()
      })
      
      // Start editing form
      const dateInput = screen.getByLabelText(/date/i)
      await user.type(dateInput, '2024-01-20')
      
      // Error should be cleared
      expect(screen.queryByText(/booking failed/i)).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('has proper ARIA labels and roles', () => {
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      expect(screen.getByLabelText(/date/i)).toHaveAttribute('aria-required', 'true')
      expect(screen.getByLabelText(/time/i)).toHaveAttribute('aria-required', 'true')
      expect(screen.getByLabelText(/duration/i)).toHaveAttribute('aria-required', 'true')
      expect(screen.getByLabelText(/session type/i)).toHaveAttribute('aria-required', 'true')
    })

    test('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      
      // Tab through form elements
      dateInput.focus()
      expect(dateInput).toHaveFocus()
      
      await user.tab()
      expect(timeInput).toHaveFocus()
      
      await user.tab()
      expect(durationSelect).toHaveFocus()
    })

    test('announces validation errors to screen readers', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const dateInput = screen.getByLabelText(/date/i)
      
      // Trigger validation error
      fireEvent.blur(dateInput)
      
      expect(screen.getByText(/date is required/i)).toHaveAttribute('role', 'alert')
    })
  })

  describe('Integration with Redux', () => {
    test('dispatches booking action on successful submission', async () => {
      const user = userEvent.setup()
      const mockDispatch = jest.fn()
      
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      // Mock the store dispatch
      jest.spyOn(mockStore, 'dispatch').mockImplementation(mockDispatch)
      
      // Fill and submit form
      const dateInput = screen.getByLabelText(/date/i)
      const timeInput = screen.getByLabelText(/time/i)
      const durationSelect = screen.getByLabelText(/duration/i)
      const sessionTypeSelect = screen.getByLabelText(/session type/i)
      const submitButton = screen.getByRole('button', { name: /book session/i })
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await user.type(dateInput, tomorrowString)
      await user.type(timeInput, '10:00')
      await user.selectOptions(durationSelect, '1')
      await user.selectOptions(sessionTypeSelect, 'Weight Training')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'booking/createStart'
          })
        )
      })
    })

    test('updates UI based on Redux state changes', () => {
      // Test loading state
      const loadingStore = configureStore({
        reducer: {
          booking: () => ({ loading: true, error: null, success: false })
        }
      })
      
      render(
        <Provider store={loadingStore}>
          <BookingForm trainer={mockTrainer} />
        </Provider>
      )
      
      expect(screen.getByRole('button', { name: /booking session/i })).toBeDisabled()
      
      // Test success state
      const successStore = configureStore({
        reducer: {
          booking: () => ({ loading: false, error: null, success: true })
        }
      })
      
      render(
        <Provider store={successStore}>
          <BookingForm trainer={mockTrainer} />
        </Provider>
      )
      
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    test('renders quickly', () => {
      const startTime = performance.now()
      
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(100)
    })

    test('handles rapid form changes without lag', async () => {
      const user = userEvent.setup()
      renderWithProvider(<BookingForm trainer={mockTrainer} />)
      
      const durationSelect = screen.getByLabelText(/duration/i)
      
      // Rapid duration changes
      const startTime = performance.now()
      for (let i = 0; i < 10; i++) {
        await user.selectOptions(durationSelect, '1')
        await user.selectOptions(durationSelect, '2')
      }
      const endTime = performance.now()
      const changeTime = endTime - startTime
      
      expect(changeTime).toBeLessThan(500) // Should handle 20 changes in under 500ms
    })
  })
})
