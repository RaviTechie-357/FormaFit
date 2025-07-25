import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Notification } from '../../types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch notifications')
    }

    const data = await response.json()
    return data
  }
)

export const markNotificationAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId: string) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to mark notification as read')
    }

    const data = await response.json()
    return data
  }
)

export const markAllNotificationsAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/notifications/read-all', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to mark all notifications as read')
    }

    const data = await response.json()
    return data
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.isRead) {
        state.unreadCount += 1
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.notifications = action.payload.notifications
        state.unreadCount = action.payload.notifications.filter((n: Notification) => !n.isRead).length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch notifications'
      })
      // Mark notification as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload.notification.id)
        if (index !== -1) {
          state.notifications[index] = action.payload.notification
          if (!state.notifications[index].isRead) {
            state.unreadCount = Math.max(0, state.unreadCount - 1)
          }
        }
      })
      // Mark all notifications as read
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map(notification => ({
          ...notification,
          isRead: true,
        }))
        state.unreadCount = 0
      })
  },
})

export const { addNotification, clearError } = notificationSlice.actions
export default notificationSlice.reducer 