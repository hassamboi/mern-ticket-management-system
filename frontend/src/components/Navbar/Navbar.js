// components
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

// assets
import Logo from '../../assets/images/acm_logo_black.png'
import './Navbar.css'

// react
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

export default function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const onSignout = () => {
    dispatch(signout())
    dispatch(reset())
    toast.info('Signed out', { position: 'bottom-left', theme: 'colored' })
  }

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <MobileNavigation onSignout={onSignout} user={user} />
        <Navigation onSignout={onSignout} user={user} />
      </div>
    </header>
  )
}
