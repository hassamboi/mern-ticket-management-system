// components
import { Link } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

// assets
import Logo from "../../assets/images/acm_logo_black.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <MobileNavigation />
        <Navigation />
      </div>
    </header>
  );
}
