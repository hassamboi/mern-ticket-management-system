import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function useFetchEvent(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch event from API
    axios
      .get(url)
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
