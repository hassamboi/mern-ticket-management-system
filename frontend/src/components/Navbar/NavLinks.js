// react
import { Link } from "react-router-dom";

export default function NavLinks({ isMobile, closeMenu }) {
  return (
    <ul>
      <li onClick={() => isMobile && closeMenu()}>
        <Link to="/#services">Services</Link>
      </li>
      <li onClick={() => isMobile && closeMenu()}>
        <Link to="/#partners">Collaborators</Link>
      </li>
      <li onClick={() => isMobile && closeMenu()}>
        <Link to="/events">Events</Link>
      </li>
      <li onClick={() => isMobile && closeMenu()}>
        <Link to="/signin" className="btn-link">
          Sign in
        </Link>
      </li>
    </ul>
  );
}
