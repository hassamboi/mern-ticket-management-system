// assets
import "./Hero.css";
import HeroImage from "../../assets/images/hero_image.png";

// components
import Button from "../Button/Button";

// library
import ScrollAnimation from "react-animate-on-scroll";

// react
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/events");

  return (
    <ScrollAnimation animateIn="fadeInDown">
      <section id="hero">
        <div className="hero-content">
          <h1>Get tickets for events like never before!</h1>
          <p>Keep yourself up to date and get tickets for all your favourite events carried out by our team.</p>
          <Button content={"View upcoming events"} handleClick={handleClick} />
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="illustration for organizing events" />
        </div>
      </section>
    </ScrollAnimation>
  );
}
