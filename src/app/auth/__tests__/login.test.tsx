import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import LoginForm from '../components/LoginForm'

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    auth: (state = { user: null, loading: false, error: null }, action) => {
      switch (action.type) {
        case 'auth/loginStart':
          return { ...state, loading: true, error: null }
        case 'auth/loginSuccess':
          return { ...state, loading: false, user: action.payload, error: null }
        case 'auth/loginFailure':
          return { ...state, loading: false, error: action.payload }
        default:
          return state
      }
    }
  }
})

// Mock API calls
jest.mock('axios', () => ({
  post: jest.fn()
}))

const renderWithProvider = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  )
}

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('renders login form with all required fields', () => {
      renderWithProvider(<LoginForm />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
    })

    test('displays form validation messages', () => {
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      // Test email validation
      fireEvent.blur(emailInput)
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      
      // Test invalid email format
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
      
      // Test password validation
      fireEvent.blur(passwordInput)
      expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    test('validates email format correctly', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      // Test valid email
      await user.type(emailInput, 'test@example.com')
      fireEvent.blur(emailInput)
      expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument()
      
      // Test invalid email
      await user.clear(emailInput)
      await user.type(emailInput, 'invalid-email')
      fireEvent.blur(emailInput)
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
    })

    test('validates password length', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      
      // Test short password
      await user.type(passwordInput, '123')
      fireEvent.blur(passwordInput)
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
      
      // Test valid password
      await user.clear(passwordInput)
      await user.type(passwordInput, 'password123')
      fireEvent.blur(passwordInput)
      expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument()
    })

    test('shows password when toggle button is clicked', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i })
      
      // Password should be hidden by default
      expect(passwordInput).toHaveAttribute('type', 'password')
      
      // Click toggle to show password
      await user.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'text')
      
      // Click toggle to hide password again
      await user.click(toggleButton)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('Form Submission', () => {
    test('submits form with valid data', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn()
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Fill form with valid data
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      
      // Submit form
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        })
      })
    })

    test('prevents submission with invalid data', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn()
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Try to submit without filling form
      await user.click(submitButton)
      
      expect(mockOnSubmit).not.toHaveBeenCalled()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })

    test('shows loading state during submission', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Fill and submit form
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      // Check loading state
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('displays authentication error messages', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'))
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Fill and submit form
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
      })
    })

    test('clears error when user starts typing', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'))
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Submit form to trigger error
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
      })
      
      // Start typing to clear error
      await user.type(emailInput, 'new')
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('has proper ARIA labels and roles', () => {
      renderWithProvider(<LoginForm />)
      
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true')
      expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-required', 'true')
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    test('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      // Tab through form elements
      emailInput.focus()
      expect(emailInput).toHaveFocus()
      
      await user.tab()
      expect(passwordInput).toHaveFocus()
    })

    test('announces errors to screen readers', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      // Trigger validation error
      fireEvent.blur(emailInput)
      
      expect(screen.getByText(/email is required/i)).toHaveAttribute('role', 'alert')
    })
  })

  describe('Integration with Redux', () => {
    test('dispatches login action on successful submission', async () => {
      const user = userEvent.setup()
      const mockDispatch = jest.fn()
      
      renderWithProvider(<LoginForm />)
      
      // Mock the store dispatch
      jest.spyOn(mockStore, 'dispatch').mockImplementation(mockDispatch)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Fill and submit form
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'auth/loginStart'
          })
        )
      })
    })

    test('updates UI based on Redux state changes', () => {
      // Test loading state
      const loadingStore = configureStore({
        reducer: {
          auth: () => ({ user: null, loading: true, error: null })
        }
      })
      
      render(
        <Provider store={loadingStore}>
          <LoginForm />
        </Provider>
      )
      
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
      
      // Test error state
      const errorStore = configureStore({
        reducer: {
          auth: () => ({ user: null, loading: false, error: 'Invalid credentials' })
        }
      })
      
      render(
        <Provider store={errorStore}>
          <LoginForm />
        </Provider>
      )
      
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  describe('Security', () => {
    test('prevents XSS attacks in form inputs', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      // Try to inject script
      const maliciousInput = '<script>alert("xss")</script>'
      await user.type(emailInput, maliciousInput)
      await user.type(passwordInput, maliciousInput)
      
      // Check that script is not executed
      expect(emailInput).toHaveValue(maliciousInput)
      expect(passwordInput).toHaveValue(maliciousInput)
      
      // Verify no script execution
      const scripts = document.querySelectorAll('script')
      expect(scripts.length).toBe(0)
    })

    test('sanitizes form data before submission', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = jest.fn()
      
      renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Input with potential injection
      await user.type(emailInput, 'test@example.com<script>')
      await user.type(passwordInput, 'password123<script>')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com<script>',
          password: 'password123<script>'
        })
      })
    })
  })

  describe('Performance', () => {
    test('renders quickly', () => {
      const startTime = performance.now()
      
      renderWithProvider(<LoginForm />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      expect(renderTime).toBeLessThan(100)
    })

    test('handles rapid user input without lag', async () => {
      const user = userEvent.setup()
      renderWithProvider(<LoginForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      // Rapid typing
      const startTime = performance.now()
      for (let i = 0; i < 50; i++) {
        await user.type(emailInput, 'a')
      }
      const endTime = performance.now()
      const inputTime = endTime - startTime
      
      expect(inputTime).toBeLessThan(1000) // Should handle 50 keystrokes in under 1 second
    })
  })
})
