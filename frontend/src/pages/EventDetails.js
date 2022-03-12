// react
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// libraries
import ScrollAnimation from "react-animate-on-scroll";
import ScrollToTop from "../components/ScrollToTop";

// assets
import Image from "../assets/images/gaming.png";
import Button from "./../components/Button/Button";
import "../assets/css/pages/event_details.css";

export default function EventDetails() {
  const { id } = useParams(); // get the event id from params

  const handleClick = e => {
    console.log(e);
  };

  // fetch the event with matching id
  useEffect(() => {
    // console.log(id);
  });

  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown" duration={0.5}>
        <section id="event-details">
          <div className="event-details-image">
            <img src={Image} alt="" />
          </div>
          <div className="event-details-content">
            <small className="event-details-category">
              Entertainment - <span className="event-details-category-upcoming">Upcoming</span>
            </small>
            <h1 className="event-details-title">
              <span>Gaming night</span>
              <span className="event-details-title-price">$25</span>
            </h1>
            <div className="event-details-meta">
              <div>
                <h2 className="event-details-meta-title">Date</h2>
                <p>September 2nd 2019</p>
              </div>
              <div>
                <h2 className="event-details-meta-title">Time</h2>
                <p>8:00 PM</p>
              </div>
              <div>
                <h2 className="event-details-meta-title">Venue</h2>
                <p>FAST NUCES, Peshawar</p>
              </div>
            </div>
            <p className="event-details-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit accusantium fuga magni architecto, alias repellendus
              aliquid sint! Deserunt dolores ipsam facilis optio aperiam, temporibus vel facere, soluta, tempore sint nam.
            </p>

            <Button content={"Get Ticket"} />
          </div>
        </section>
      </ScrollAnimation>
    </main>
  );
}
