// components
import NavLinks from './NavLinks'

export default function Navigation({ user, onSignout }) {
  return (
    <nav className="navbar navigation">
      <NavLinks user={user} onSignout={onSignout} />
    </nav>
  )
}
