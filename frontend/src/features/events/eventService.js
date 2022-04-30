import axios from 'axios'

const API_URL = '/api/events/'

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, eventData, config)

  return response.data
}

// Get events
const getEvents = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const eventService = {
  createEvent,
  getEvents,
}

export default eventService
