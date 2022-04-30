import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function UserProfile() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [user, navigate])

  return <div>UserProfile</div>
}
