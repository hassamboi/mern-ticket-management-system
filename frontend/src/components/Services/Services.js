// assets and libraries
import "./Services.css";
import { FaCalendarCheck, FaTicketAlt, FaCode } from "react-icons/fa";
import ScrollAnimation from "react-animate-on-scroll";

// components and hooks
import ServiceList from "./ServiceList";
import { useState } from "react";

// entire services section
export default function Services() {
  const [services, setServices] = useState([
    {
      title: "Events",
      desc: "We carry out events in collaborations with the most well renowned societies across universities in Pakistan",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Online Tickets",
      desc: "Increase your productivity by purchasing and managing tickets for all our events and workshops online.",
      icon: <FaTicketAlt />,
    },
    {
      title: "Workshops",
      desc: "We host workshops on latest technologies carried out by the industry experts.",
      icon: <FaCode />,
    },
  ]);

  return (
    <ScrollAnimation animateIn="fadeInDown">
      <section id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-wrapper">
          <ServiceList services={services} />
        </div>
      </section>
    </ScrollAnimation>
  );
}
