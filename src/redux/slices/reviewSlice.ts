import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Review, ReviewFormData } from '../../types'

interface ReviewState {
  reviews: Review[]
  isLoading: boolean
  error: string | null
}

const initialState: ReviewState = {
  reviews: [],
  isLoading: false,
  error: null,
}

// Async thunks
export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: ReviewFormData) => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create review')
    }

    const data = await response.json()
    return data
  }
)

export const fetchTrainerReviews = createAsyncThunk(
  'review/fetchTrainerReviews',
  async (trainerId: string) => {
    const response = await fetch(`/api/reviews/trainer/${trainerId}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch reviews')
    }

    const data = await response.json()
    return data
  }
)

export const fetchUserReviews = createAsyncThunk(
  'review/fetchUserReviews',
  async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/reviews/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch reviews')
    }

    const data = await response.json()
    return data
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews.unshift(action.payload.review)
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to create review'
      })
      // Fetch trainer reviews
      .addCase(fetchTrainerReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrainerReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload.reviews
      })
      .addCase(fetchTrainerReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch reviews'
      })
      // Fetch user reviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload.reviews
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch reviews'
      })
  },
})

export const { clearError } = reviewSlice.actions
export default reviewSlice.reducer 