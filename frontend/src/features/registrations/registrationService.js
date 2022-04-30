import axios from 'axios'

const API_URL = '/api/registrations/'

// Create new registration
const createRegistration = async (registrationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, registrationData, config)

  return response.data
}

// Get my registrations
const getMyRegistrations = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'me', config)
  return response.data
}

const registrationService = {
  createRegistration,
  getMyRegistrations,
}

export default registrationService
