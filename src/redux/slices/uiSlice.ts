import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Toast, Modal } from '../../types'

interface UIState {
  toasts: Toast[]
  modals: Modal[]
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}

const initialState: UIState = {
  toasts: [],
  modals: [],
  sidebarOpen: false,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Math.random().toString(36).substring(2)
      const toast: Toast = {
        id,
        ...action.payload,
      }
      state.toasts.push(toast)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },
    clearToasts: (state) => {
      state.toasts = []
    },
    openModal: (state, action: PayloadAction<Omit<Modal, 'id'>>) => {
      const id = Math.random().toString(36).substring(2)
      const modal: Modal = {
        id,
        ...action.payload,
        isOpen: true,
      }
      state.modals.push(modal)
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modal = state.modals.find(m => m.id === action.payload)
      if (modal) {
        modal.isOpen = false
      }
    },
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.id !== action.payload)
    },
    clearModals: (state) => {
      state.modals = []
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
  },
})

export const {
  addToast,
  removeToast,
  clearToasts,
  openModal,
  closeModal,
  removeModal,
  clearModals,
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
} = uiSlice.actions

export default uiSlice.reducer 