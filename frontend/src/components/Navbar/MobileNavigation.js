// components
import NavLinks from './NavLinks'

// react
import { FiMenu } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import { useState } from 'react'

export default function MobileNavigation({ user, onSignout }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleMenuClick = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const hamburgerIcon = <FiMenu size="30px" color="black" onClick={handleMenuClick} />
  const closeIcon = <GrFormClose size="30px" color="black" onClick={handleMenuClick} />

  return (
    <nav className="navbar mobile-navigation">
      {isOpen ? closeIcon : hamburgerIcon}
      {isOpen && <NavLinks onSignout={onSignout} user={user} isMobile={true} closeMenu={closeMenu} />}
    </nav>
  )
}
