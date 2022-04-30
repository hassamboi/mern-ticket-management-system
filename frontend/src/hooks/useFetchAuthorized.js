import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function useFetchEvent(url, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      return { data, isLoading, error }
    }
    axios
      .get(url, config)
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [url])

  return { data, isLoading, error }
}
