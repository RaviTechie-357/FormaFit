import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/')
  })

  test.describe('User Registration', () => {
    test('should allow new user to register successfully', async ({ page }) => {
      // Navigate to registration page
      await page.click('text=Sign Up')
      
      // Fill registration form
      await page.fill('[data-testid="email-input"]', 'newuser@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.fill('[data-testid="name-input"]', 'New User')
      
      // Submit form
      await page.click('[data-testid="register-button"]')
      
      // Verify successful registration
      await expect(page).toHaveURL('/dashboard')
      await expect(page.locator('text=Welcome, New User')).toBeVisible()
    })

    test('should show validation errors for invalid registration data', async ({ page }) => {
      // Navigate to registration page
      await page.click('text=Sign Up')
      
      // Try to submit empty form
      await page.click('[data-testid="register-button"]')
      
      // Verify validation errors
      await expect(page.locator('text=Email is required')).toBeVisible()
      await expect(page.locator('text=Password is required')).toBeVisible()
      await expect(page.locator('text=Name is required')).toBeVisible()
    })

    test('should prevent registration with existing email', async ({ page }) => {
      // Navigate to registration page
      await page.click('text=Sign Up')
      
      // Fill form with existing email
      await page.fill('[data-testid="email-input"]', 'existing@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.fill('[data-testid="name-input"]', 'Existing User')
      
      // Submit form
      await page.click('[data-testid="register-button"]')
      
      // Verify error message
      await expect(page.locator('text=User already exists')).toBeVisible()
    })

    test('should validate password strength', async ({ page }) => {
      // Navigate to registration page
      await page.click('text=Sign Up')
      
      // Fill form with weak password
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', '123')
      await page.fill('[data-testid="name-input"]', 'Test User')
      
      // Submit form
      await page.click('[data-testid="register-button"]')
      
      // Verify password strength error
      await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible()
    })
  })

  test.describe('User Login', () => {
    test('should allow existing user to login successfully', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Fill login form
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      
      // Submit form
      await page.click('[data-testid="login-button"]')
      
      // Verify successful login
      await expect(page).toHaveURL('/dashboard')
      await expect(page.locator('text=Welcome back')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Fill form with wrong credentials
      await page.fill('[data-testid="email-input"]', 'wrong@example.com')
      await page.fill('[data-testid="password-input"]', 'wrongpassword')
      
      // Submit form
      await page.click('[data-testid="login-button"]')
      
      // Verify error message
      await expect(page.locator('text=Invalid credentials')).toBeVisible()
    })

    test('should validate required fields', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Try to submit empty form
      await page.click('[data-testid="login-button"]')
      
      // Verify validation errors
      await expect(page.locator('text=Email is required')).toBeVisible()
      await expect(page.locator('text=Password is required')).toBeVisible()
    })

    test('should validate email format', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Fill form with invalid email
      await page.fill('[data-testid="email-input"]', 'invalid-email')
      await page.fill('[data-testid="password-input"]', 'password123')
      
      // Submit form
      await page.click('[data-testid="login-button"]')
      
      // Verify email format error
      await expect(page.locator('text=Invalid email format')).toBeVisible()
    })
  })

  test.describe('Password Reset', () => {
    test('should allow user to request password reset', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Click forgot password link
      await page.click('text=Forgot Password?')
      
      // Fill email
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      
      // Submit reset request
      await page.click('[data-testid="reset-button"]')
      
      // Verify success message
      await expect(page.locator('text=Password reset email sent')).toBeVisible()
    })

    test('should validate email for password reset', async ({ page }) => {
      // Navigate to password reset page
      await page.goto('/auth/reset-password')
      
      // Try to submit without email
      await page.click('[data-testid="reset-button"]')
      
      // Verify validation error
      await expect(page.locator('text=Email is required')).toBeVisible()
    })
  })

  test.describe('User Logout', () => {
    test('should allow user to logout successfully', async ({ page }) => {
      // Login first
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Wait for login to complete
      await expect(page).toHaveURL('/dashboard')
      
      // Click logout
      await page.click('[data-testid="logout-button"]')
      
      // Verify logout
      await expect(page).toHaveURL('/')
      await expect(page.locator('text=Sign In')).toBeVisible()
    })
  })

  test.describe('Authentication Persistence', () => {
    test('should maintain login state after page refresh', async ({ page }) => {
      // Login
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Wait for login to complete
      await expect(page).toHaveURL('/dashboard')
      
      // Refresh page
      await page.reload()
      
      // Verify still logged in
      await expect(page).toHaveURL('/dashboard')
      await expect(page.locator('text=Welcome back')).toBeVisible()
    })

    test('should redirect to dashboard if already logged in', async ({ page }) => {
      // Login first
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Wait for login to complete
      await expect(page).toHaveURL('/dashboard')
      
      // Try to access login page
      await page.goto('/auth/login')
      
      // Should be redirected to dashboard
      await expect(page).toHaveURL('/dashboard')
    })
  })

  test.describe('Role-Based Access', () => {
    test('should redirect client to client dashboard', async ({ page }) => {
      // Login as client
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'client@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Should be redirected to client dashboard
      await expect(page).toHaveURL('/dashboard/client')
      await expect(page.locator('text=Client Dashboard')).toBeVisible()
    })

    test('should redirect trainer to trainer dashboard', async ({ page }) => {
      // Login as trainer
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'trainer@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Should be redirected to trainer dashboard
      await expect(page).toHaveURL('/dashboard/trainer')
      await expect(page.locator('text=Trainer Dashboard')).toBeVisible()
    })

    test('should redirect admin to admin dashboard', async ({ page }) => {
      // Login as admin
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'admin@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Should be redirected to admin dashboard
      await expect(page).toHaveURL('/dashboard/admin')
      await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    })
  })

  test.describe('Security Features', () => {
    test('should prevent access to protected routes without authentication', async ({ page }) => {
      // Try to access dashboard without login
      await page.goto('/dashboard')
      
      // Should be redirected to login
      await expect(page).toHaveURL('/auth/login')
    })

    test('should prevent access to admin routes for non-admin users', async ({ page }) => {
      // Login as regular user
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'client@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Try to access admin dashboard
      await page.goto('/dashboard/admin')
      
      // Should be redirected to appropriate dashboard or show error
      await expect(page).not.toHaveURL('/dashboard/admin')
    })

    test('should handle expired tokens gracefully', async ({ page }) => {
      // Login
      await page.click('text=Sign In')
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Wait for login to complete
      await expect(page).toHaveURL('/dashboard')
      
      // Simulate token expiration by clearing localStorage
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
      
      // Refresh page
      await page.reload()
      
      // Should be redirected to login
      await expect(page).toHaveURL('/auth/login')
    })
  })

  test.describe('Form Accessibility', () => {
    test('should support keyboard navigation', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Tab through form elements
      await page.keyboard.press('Tab')
      await expect(page.locator('[data-testid="email-input"]')).toBeFocused()
      
      await page.keyboard.press('Tab')
      await expect(page.locator('[data-testid="password-input"]')).toBeFocused()
      
      await page.keyboard.press('Tab')
      await expect(page.locator('[data-testid="login-button"]')).toBeFocused()
    })

    test('should have proper ARIA labels', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Check ARIA attributes
      await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('aria-required', 'true')
      await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('aria-required', 'true')
    })

    test('should announce errors to screen readers', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Submit empty form
      await page.click('[data-testid="login-button"]')
      
      // Check error announcements
      await expect(page.locator('text=Email is required')).toHaveAttribute('role', 'alert')
      await expect(page.locator('text=Password is required')).toHaveAttribute('role', 'alert')
    })
  })

  test.describe('Mobile Responsiveness', () => {
    test('should work correctly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Verify form is accessible on mobile
      await expect(page.locator('[data-testid="email-input"]')).toBeVisible()
      await expect(page.locator('[data-testid="password-input"]')).toBeVisible()
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible()
      
      // Fill and submit form
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Verify successful login on mobile
      await expect(page).toHaveURL('/dashboard')
    })
  })

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Mock network error
      await page.route('**/api/auth/login', route => {
        route.abort('failed')
      })
      
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Fill and submit form
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Verify error handling
      await expect(page.locator('text=Network error')).toBeVisible()
    })

    test('should handle server errors gracefully', async ({ page }) => {
      // Mock server error
      await page.route('**/api/auth/login', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' })
        })
      })
      
      // Navigate to login page
      await page.click('text=Sign In')
      
      // Fill and submit form
      await page.fill('[data-testid="email-input"]', 'test@example.com')
      await page.fill('[data-testid="password-input"]', 'password123')
      await page.click('[data-testid="login-button"]')
      
      // Verify error handling
      await expect(page.locator('text=Internal server error')).toBeVisible()
    })
  })
})
