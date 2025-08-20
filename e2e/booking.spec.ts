import { test, expect } from '@playwright/test'

test.describe('Booking Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a client before each test
    await page.goto('/')
    await page.click('text=Sign In')
    await page.fill('[data-testid="email-input"]', 'client@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    
    // Wait for login to complete
    await expect(page).toHaveURL('/dashboard/client')
  })

  test.describe('Trainer Discovery', () => {
    test('should display list of available trainers', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Verify trainers are displayed
      await expect(page.locator('[data-testid="trainer-card"]')).toHaveCount(4)
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      await expect(page.locator('text=Mike Chen')).toBeVisible()
    })

    test('should show trainer details correctly', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Check first trainer details
      const firstTrainer = page.locator('[data-testid="trainer-card"]').first()
      await expect(firstTrainer.locator('text=Sarah Johnson')).toBeVisible()
      await expect(firstTrainer.locator('text=$75/hr')).toBeVisible()
      await expect(firstTrainer.locator('text=4.9')).toBeVisible()
      await expect(firstTrainer.locator('text=New York, NY')).toBeVisible()
    })

    test('should filter trainers by specialization', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Select Yoga specialization
      await page.selectOption('[data-testid="specialization-filter"]', 'Yoga')
      
      // Verify only yoga trainers are shown
      await expect(page.locator('[data-testid="trainer-card"]')).toHaveCount(1)
      await expect(page.locator('text=Mike Chen')).toBeVisible()
      await expect(page.locator('text=Sarah Johnson')).not.toBeVisible()
    })

    test('should filter trainers by price range', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Select low price range
      await page.selectOption('[data-testid="price-filter"]', 'low')
      
      // Verify only low-priced trainers are shown
      await expect(page.locator('[data-testid="trainer-card"]')).toHaveCount(1)
      await expect(page.locator('text=Mike Chen')).toBeVisible() // $65/hr
    })

    test('should search trainers by name or location', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Search by name
      await page.fill('[data-testid="search-input"]', 'Sarah')
      
      // Verify only Sarah is shown
      await expect(page.locator('[data-testid="trainer-card"]')).toHaveCount(1)
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      
      // Search by location
      await page.fill('[data-testid="search-input"]', 'New York')
      
      // Verify only New York trainers are shown
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      await expect(page.locator('text=Mike Chen')).not.toBeVisible()
    })

    test('should sort trainers by rating', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Sort by rating (highest first)
      await page.selectOption('[data-testid="sort-select"]', 'rating')
      
      // Verify Sarah (4.9) appears before Mike (4.8)
      const trainers = page.locator('[data-testid="trainer-card"]')
      await expect(trainers.nth(0).locator('text=Sarah Johnson')).toBeVisible()
      await expect(trainers.nth(1).locator('text=Mike Chen')).toBeVisible()
    })

    test('should sort trainers by price', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Sort by price (lowest first)
      await page.selectOption('[data-testid="sort-select"]', 'price')
      
      // Verify Mike ($65) appears before Sarah ($75)
      const trainers = page.locator('[data-testid="trainer-card"]')
      await expect(trainers.nth(0).locator('text=Mike Chen')).toBeVisible()
      await expect(trainers.nth(1).locator('text=Sarah Johnson')).toBeVisible()
    })
  })

  test.describe('Trainer Profile View', () => {
    test('should display detailed trainer profile', async ({ page }) => {
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Click on trainer to view profile
      await page.click('text=View Profile')
      
      // Verify profile details
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      await expect(page.locator('text=Certified personal trainer')).toBeVisible()
      await expect(page.locator('text=8+ years of experience')).toBeVisible()
      await expect(page.locator('text=Weight Training')).toBeVisible()
      await expect(page.locator('text=Cardio')).toBeVisible()
      await expect(page.locator('text=Nutrition')).toBeVisible()
    })

    test('should show trainer reviews', async ({ page }) => {
      // Navigate to trainer profile
      await page.goto('/trainers/sarah-johnson')
      
      // Verify reviews section
      await expect(page.locator('text=Reviews')).toBeVisible()
      await expect(page.locator('[data-testid="review-item"]')).toHaveCount(5)
      
      // Check review content
      await expect(page.locator('text=Great trainer!')).toBeVisible()
      await expect(page.locator('text=Very professional')).toBeVisible()
    })

    test('should display trainer availability', async ({ page }) => {
      // Navigate to trainer profile
      await page.goto('/trainers/sarah-johnson')
      
      // Verify availability section
      await expect(page.locator('text=Availability')).toBeVisible()
      await expect(page.locator('[data-testid="availability-calendar"]')).toBeVisible()
    })
  })

  test.describe('Session Booking', () => {
    test('should allow booking a session with trainer', async ({ page }) => {
      // Navigate to trainer profile
      await page.goto('/trainers/sarah-johnson')
      
      // Click book session button
      await page.click('[data-testid="book-session-button"]')
      
      // Fill booking form
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.fill('[data-testid="notes-input"]', 'First session, beginner level')
      
      // Submit booking
      await page.click('[data-testid="submit-booking-button"]')
      
      // Verify booking confirmation
      await expect(page.locator('text=Booking Confirmed')).toBeVisible()
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      await expect(page.locator('text=Total: $75')).toBeVisible()
    })

    test('should validate booking form fields', async ({ page }) => {
      // Navigate to booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      // Try to submit empty form
      await page.click('[data-testid="submit-booking-button"]')
      
      // Verify validation errors
      await expect(page.locator('text=Date is required')).toBeVisible()
      await expect(page.locator('text=Time is required')).toBeVisible()
      await expect(page.locator('text=Session type is required')).toBeVisible()
    })

    test('should prevent booking in the past', async ({ page }) => {
      // Navigate to booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      // Set date to yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', yesterdayString)
      
      // Verify error message
      await expect(page.locator('text=Date cannot be in the past')).toBeVisible()
    })

    test('should prevent booking outside business hours', async ({ page }) => {
      // Navigate to booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      // Try to select time outside business hours
      await page.selectOption('[data-testid="time-select"]', '05:00')
      
      // Verify error message
      await expect(page.locator('text=Booking hours are 6:00 AM to 10:00 PM')).toBeVisible()
    })

    test('should calculate cost correctly', async ({ page }) => {
      // Navigate to booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      // Select 2-hour session
      await page.selectOption('[data-testid="duration-select"]', '2')
      
      // Verify cost calculation
      await expect(page.locator('text=Total Cost: $150')).toBeVisible()
      
      // Select 3-hour session with discount
      await page.selectOption('[data-testid="duration-select"]', '3')
      
      // Verify discounted cost
      await expect(page.locator('text=Total Cost: $202.50')).toBeVisible()
      await expect(page.locator('text=10% discount applied')).toBeVisible()
    })

    test('should show available time slots', async ({ page }) => {
      // Navigate to booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      // Set date to tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      
      // Verify time slots are populated
      await expect(page.locator('[data-testid="time-select"] option')).toHaveCount(17) // 6 AM to 10 PM
    })
  })

  test.describe('Payment Processing', () => {
    test('should process payment successfully', async ({ page }) => {
      // Complete booking form
      await page.goto('/trainers/sarah-johnson/book')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Fill payment form
      await page.fill('[data-testid="card-number"]', '4242424242424242')
      await page.fill('[data-testid="card-expiry"]', '12/25')
      await page.fill('[data-testid="card-cvc"]', '123')
      await page.fill('[data-testid="card-name"]', 'John Doe')
      
      // Submit payment
      await page.click('[data-testid="pay-button"]')
      
      // Verify payment success
      await expect(page.locator('text=Payment Successful')).toBeVisible()
      await expect(page.locator('text=Booking Confirmed')).toBeVisible()
    })

    test('should handle payment errors gracefully', async ({ page }) => {
      // Complete booking and reach payment
      await page.goto('/trainers/sarah-johnson/book')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Use declined card
      await page.fill('[data-testid="card-number"]', '4000000000000002')
      await page.fill('[data-testid="card-expiry"]', '12/25')
      await page.fill('[data-testid="card-cvc"]', '123')
      await page.fill('[data-testid="card-name"]', 'John Doe')
      
      // Submit payment
      await page.click('[data-testid="pay-button"]')
      
      // Verify payment error
      await expect(page.locator('text=Payment Failed')).toBeVisible()
      await expect(page.locator('text=Your card was declined')).toBeVisible()
    })

    test('should validate payment form fields', async ({ page }) => {
      // Reach payment form
      await page.goto('/trainers/sarah-johnson/book')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Try to submit empty payment form
      await page.click('[data-testid="pay-button"]')
      
      // Verify validation errors
      await expect(page.locator('text=Card number is required')).toBeVisible()
      await expect(page.locator('text=Expiry date is required')).toBeVisible()
      await expect(page.locator('text=CVC is required')).toBeVisible()
    })
  })

  test.describe('Booking Management', () => {
    test('should display user bookings in dashboard', async ({ page }) => {
      // Navigate to dashboard
      await page.goto('/dashboard/client')
      
      // Verify bookings section
      await expect(page.locator('text=My Bookings')).toBeVisible()
      await expect(page.locator('[data-testid="booking-item"]')).toHaveCount(2)
      
      // Check booking details
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      await expect(page.locator('text=Weight Training')).toBeVisible()
      await expect(page.locator('text=Confirmed')).toBeVisible()
    })

    test('should allow cancelling a booking', async ({ page }) => {
      // Navigate to dashboard
      await page.goto('/dashboard/client')
      
      // Click cancel on first booking
      await page.click('[data-testid="cancel-booking-button"]').first()
      
      // Confirm cancellation
      await page.click('text=Yes, Cancel')
      
      // Verify cancellation
      await expect(page.locator('text=Booking Cancelled')).toBeVisible()
      await expect(page.locator('text=Cancelled')).toBeVisible()
    })

    test('should allow rescheduling a booking', async ({ page }) => {
      // Navigate to dashboard
      await page.goto('/dashboard/client')
      
      // Click reschedule on first booking
      await page.click('[data-testid="reschedule-booking-button"]').first()
      
      // Select new date and time
      const newDate = new Date()
      newDate.setDate(newDate.getDate() + 2)
      const newDateString = newDate.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', newDateString)
      await page.selectOption('[data-testid="time-select"]', '14:00')
      
      // Submit reschedule
      await page.click('[data-testid="submit-reschedule-button"]')
      
      // Verify reschedule
      await expect(page.locator('text=Booking Rescheduled')).toBeVisible()
    })

    test('should show booking history', async ({ page }) => {
      // Navigate to booking history
      await page.click('text=Booking History')
      
      // Verify past bookings
      await expect(page.locator('[data-testid="past-booking"]')).toHaveCount(5)
      await expect(page.locator('text=Completed')).toBeVisible()
      await expect(page.locator('text=Cancelled')).toBeVisible()
    })
  })

  test.describe('Notifications', () => {
    test('should send booking confirmation email', async ({ page }) => {
      // Complete a booking
      await page.goto('/trainers/sarah-johnson/book')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Complete payment
      await page.fill('[data-testid="card-number"]', '4242424242424242')
      await page.fill('[data-testid="card-expiry"]', '12/25')
      await page.fill('[data-testid="card-cvc"]', '123')
      await page.fill('[data-testid="card-name"]', 'John Doe')
      await page.click('[data-testid="pay-button"]')
      
      // Verify confirmation message
      await expect(page.locator('text=Confirmation email sent')).toBeVisible()
    })

    test('should show booking reminders', async ({ page }) => {
      // Navigate to dashboard
      await page.goto('/dashboard/client')
      
      // Verify reminder notification
      await expect(page.locator('text=You have a session tomorrow')).toBeVisible()
      await expect(page.locator('text=Sarah Johnson at 10:00 AM')).toBeVisible()
    })
  })

  test.describe('Mobile Experience', () => {
    test('should work correctly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Navigate to trainers page
      await page.click('text=Find Trainers')
      
      // Verify mobile layout
      await expect(page.locator('[data-testid="trainer-card"]')).toBeVisible()
      
      // Click on trainer
      await page.click('text=View Profile')
      
      // Verify mobile profile view
      await expect(page.locator('text=Sarah Johnson')).toBeVisible()
      
      // Book session on mobile
      await page.click('[data-testid="book-session-button"]')
      
      // Verify mobile booking form
      await expect(page.locator('[data-testid="date-input"]')).toBeVisible()
      await expect(page.locator('[data-testid="time-select"]')).toBeVisible()
    })
  })

  test.describe('Error Handling', () => {
    test('should handle trainer unavailability', async ({ page }) => {
      // Try to book with unavailable trainer
      await page.goto('/trainers/unavailable-trainer/book')
      
      // Verify unavailability message
      await expect(page.locator('text=Trainer is not available')).toBeVisible()
      await expect(page.locator('text=Please select another time')).toBeVisible()
    })

    test('should handle booking conflicts', async ({ page }) => {
      // Book a session
      await page.goto('/trainers/sarah-johnson/book')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowString = tomorrow.toISOString().split('T')[0]
      
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Try to book same time slot again
      await page.goto('/trainers/sarah-johnson/book')
      await page.fill('[data-testid="date-input"]', tomorrowString)
      await page.selectOption('[data-testid="time-select"]', '10:00')
      await page.selectOption('[data-testid="duration-select"]', '1')
      await page.selectOption('[data-testid="session-type-select"]', 'Weight Training')
      await page.click('[data-testid="submit-booking-button"]')
      
      // Verify conflict error
      await expect(page.locator('text=Time slot not available')).toBeVisible()
    })
  })
})
