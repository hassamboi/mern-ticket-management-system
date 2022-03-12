// assets
import Image from "../../assets/images/calendar.png";
import "./PaginatedEvents.css";

// react
import { FaClock, FaCalendarWeek, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// components
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";

export default function Event({ event }) {
  const navigate = useNavigate();
  const handleClick = id => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="event">
      <div className={`event-status-wrapper ${event.concluded ? "event-status-concluded" : "event-status-upcoming"}`}>
        <div className="event-status">{event.concluded ? "Concluded" : "Upcoming"}</div>
      </div>

      <div className="event-image">
        <Avatar image={Image} width="150px" height="150px" handleClick={() => handleClick(event.id)} />
      </div>

      <div className="event-details">
        <div className="event-title">
          <h2 onClick={() => handleClick(event.id)}>{event.name}</h2>
          <span>${event.price}</span>
        </div>
        <div className="event-meta">
          <span>
            <div className="event-meta-icon">
              <FaCalendarWeek />
            </div>

            <div>
              <p>{event.date}</p>
            </div>
          </span>
          <span>
            <div className="event-meta-icon">
              <FaClock />
            </div>
            <div>
              <p>{event.time}</p>
            </div>
          </span>
          <span>
            <div className="event-meta-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p>{event.venue}</p>
            </div>
          </span>
        </div>
      </div>
      <div className="event-btn">
        <Button content={"Get Ticket"} disabled={event.concluded} handleClick={() => handleClick(event.id)} />
      </div>
    </div>
  );
}
