import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, TrainerProfile, TrainerFilters } from '../../types'

interface TrainerState {
  trainers: User[]
  currentTrainer: User | null
  isLoading: boolean
  error: string | null
  filters: TrainerFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: TrainerState = {
  trainers: [],
  currentTrainer: null,
  isLoading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}

// Async thunks
export const fetchTrainers = createAsyncThunk(
  'trainer/fetchTrainers',
  async (filters: TrainerFilters = {}) => {
    const params = new URLSearchParams()
    
    if (filters.search) params.append('search', filters.search)
    if (filters.skills?.length) params.append('skills', filters.skills.join(','))
    if (filters.minRating) params.append('minRating', filters.minRating.toString())
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters.location) params.append('location', filters.location)
    if (filters.availability) {
      params.append('dayOfWeek', filters.availability.dayOfWeek.toString())
      params.append('time', filters.availability.time)
    }

    const response = await fetch(`/api/trainers?${params.toString()}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch trainers')
    }

    const data = await response.json()
    return data
  }
)

export const fetchTrainerById = createAsyncThunk(
  'trainer/fetchTrainerById',
  async (id: string) => {
    const response = await fetch(`/api/trainers/${id}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch trainer')
    }

    const data = await response.json()
    return data
  }
)

export const updateTrainerProfile = createAsyncThunk(
  'trainer/updateProfile',
  async (profileData: Partial<TrainerProfile>) => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/trainers/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update profile')
    }

    const data = await response.json()
    return data
  }
)

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TrainerFilters>) => {
      state.filters = action.payload
      state.pagination.page = 1 // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {}
      state.pagination.page = 1
    },
    setCurrentTrainer: (state, action: PayloadAction<User | null>) => {
      state.currentTrainer = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trainers
      .addCase(fetchTrainers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.isLoading = false
        state.trainers = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch trainers'
      })
      // Fetch trainer by ID
      .addCase(fetchTrainerById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrainerById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTrainer = action.payload.trainer
      })
      .addCase(fetchTrainerById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch trainer'
      })
      // Update trainer profile
      .addCase(updateTrainerProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTrainerProfile.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.currentTrainer) {
          state.currentTrainer.trainerProfile = action.payload.trainerProfile
        }
      })
      .addCase(updateTrainerProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to update profile'
      })
  },
})

export const { setFilters, clearFilters, setCurrentTrainer, clearError } = trainerSlice.actions
export default trainerSlice.reducer 