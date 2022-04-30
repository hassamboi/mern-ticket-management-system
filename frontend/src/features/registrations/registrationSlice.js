import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrationService from './registrationService'

const initialState = {
  registrations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new event registration
export const createRegistration = createAsyncThunk('registrations/create', async (registrationData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await registrationService.createRegistration(registrationData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get my event registrations
export const getMyRegistrations = createAsyncThunk('registrations/getMine', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await registrationService.getMyRegistrations(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const registratonSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createRegistration.pending, state => {
        state.isLoading = true
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.registrations.push(action.payload)
      })
      .addCase(createRegistration.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyRegistrations.pending, state => {
        state.isLoading = true
      })
      .addCase(getMyRegistrations.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.registrations = action.payload
      })
      .addCase(getMyRegistrations.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = registratonSlice.actions
export default registratonSlice.reducer
