import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async userData => {
  const response = await axios.post(API_URL, userData)

  if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}

// Register user
const signin = async userData => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}

// Logout user
const signout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  signout,
  signin,
}

export default authService
