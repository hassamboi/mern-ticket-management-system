import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/events/eventSlice'
import registrationReducer from '../features/registrations/registrationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    registrations: registrationReducer,
  },
})
