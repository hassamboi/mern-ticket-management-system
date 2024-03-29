// assets
import Image from '../../assets/images/calendar.png'
import './PaginatedEvents.css'
import monthNames from './../../assets/js/monthNames'

// react
import { FaClock, FaCalendarWeek, FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// components
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'

export default function Event({ event }) {
  const eventDate = new Date(event.date)

  const [time, setTime] = useState(eventDate.toLocaleTimeString('en', { timeStyle: 'short', hour12: true }))

  const [date, setDate] = useState({
    dt: eventDate.getDate(),
    month: monthNames[eventDate.getMonth()],
    year: eventDate.getFullYear(),
  })

  const navigate = useNavigate()
  const handleClick = id => {
    navigate(`/events/${id}`)
  }

  return (
    <div className="event">
      <div className={`event-status-wrapper ${event.concluded ? 'event-status-concluded' : 'event-status-upcoming'}`}>
        <div className="event-status">{event.concluded ? 'Concluded' : 'Upcoming'}</div>
      </div>

      <div className="event-image">
        <Avatar image={Image} width="150px" height="150px" handleClick={() => handleClick(event.event_id)} />
      </div>

      <div className="event-details">
        <div className="event-title">
          <h2 onClick={() => handleClick(event.event_id)}>{event.name}</h2>
          <span>${event.price}</span>
        </div>
        <div className="event-meta">
          <span>
            <div className="event-meta-icon">
              <FaCalendarWeek />
            </div>

            <div>
              <p>{`${date.dt} ${date.month} ${date.year}`}</p>
            </div>
          </span>
          <span>
            <div className="event-meta-icon">
              <FaClock />
            </div>
            <div>
              <p>{time}</p>
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
        <Button content={'Get Ticket'} disabled={event.concluded} handleClick={() => handleClick(event.event_id)} />
      </div>
    </div>
  )
}
