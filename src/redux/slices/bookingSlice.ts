import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Booking, BookingFormData } from '../../types'

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  isLoading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
}

// Async thunks
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: BookingFormData) => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create booking')
    }

    const data = await response.json()
    return data
  }
)

export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/bookings/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch bookings')
    }

    const data = await response.json()
    return data
  }
)

export const updateBookingStatus = createAsyncThunk(
  'booking/updateStatus',
  async ({ bookingId, status }: { bookingId: string; status: string }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update booking status')
    }

    const data = await response.json()
    return data
  }
)

export const cancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async (bookingId: string) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to cancel booking')
    }

    const data = await response.json()
    return data
  }
)

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings.unshift(action.payload.booking)
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to create booking'
      })
      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = action.payload.bookings
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch bookings'
      })
      // Update booking status
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.booking.id)
        if (index !== -1) {
          state.bookings[index] = action.payload.booking
        }
        if (state.currentBooking?.id === action.payload.booking.id) {
          state.currentBooking = action.payload.booking
        }
      })
      // Cancel booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.booking.id)
        if (index !== -1) {
          state.bookings[index] = action.payload.booking
        }
        if (state.currentBooking?.id === action.payload.booking.id) {
          state.currentBooking = action.payload.booking
        }
      })
  },
})

export const { setCurrentBooking, clearError } = bookingSlice.actions
export default bookingSlice.reducer 