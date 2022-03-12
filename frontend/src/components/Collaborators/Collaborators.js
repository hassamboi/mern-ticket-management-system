// library
import ScrollAnimation from "react-animate-on-scroll";
import Slider from "react-slick";

// assets
import "./Collaborators.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react
import { FaGoogle, FaMicrosoft, FaTwitter, FaYahoo, FaSpotify, FaAmazon } from "react-icons/fa";

export default function Collaborators() {
  const settings = {
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    centerMode: true,
    draggable: true,
  };

  return (
    <ScrollAnimation animateIn="fadeInDown">
      <section id="collaborators">
        <h2 className="section-title">Collaboraters</h2>
        <div className="collaborators-wrapper">
          <Slider {...settings}>
            <FaGoogle />
            <FaMicrosoft />
            <FaTwitter />
            <FaAmazon />
            <FaYahoo />
            <FaSpotify />
          </Slider>
        </div>
      </section>
    </ScrollAnimation>
  );
}
