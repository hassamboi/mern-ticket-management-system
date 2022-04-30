// react
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'

// libraries
import ScrollAnimation from 'react-animate-on-scroll'
import ScrollToTop from '../components/ScrollToTop'

// assets
import Image from '../assets/images/gaming.png'
import Button from './../components/Button/Button'
import '../assets/css/pages/event_details.css'
import Spinner from './../components/Spinner/Spinner'
import useFetch from './../hooks/useFetch'
import useFetchAuthorized from './../hooks/useFetchAuthorized'
import monthNames from '../assets/js/monthNames'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRegistration, reset } from './../features/registrations/registrationSlice'

export default function EventDetails() {
  const { id } = useParams() // get the event id from params
  const { user } = useSelector(state => state.auth)
  const { registrations, isError, message, isSuccess, isLoading } = useSelector(state => state.registrations)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      toast.info('Sign in to get ticket', { position: 'bottom-left', theme: 'colored' })
    }
  }, [])

  // After creating a registration handle state change / responses from the servers
  useEffect(() => {
    if (isError) {
      toast.error(message, { position: 'bottom-left', theme: 'colored' })
    }
    if (isSuccess) {
      toast.success('Successfully registered', { position: 'bottom-left', theme: 'colored' })
      navigate('/')
    }
    dispatch(reset())
  }, [registrations, isError, isSuccess, message, navigate, dispatch])

  const handleClick = () => {
    // make registration here
    const registrationData = {
      paymentOption: 'easypaisa',
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      eventId: id,
    }

    dispatch(createRegistration(registrationData))
  }

  const { data: event, isLoading: eventLoading } = useFetch(`/api/events/${id}`)

  const { data: registration, isLoading: regLoading } = useFetchAuthorized(
    `/api/registrations/me/event/${id}`,
    user ? user.token : user
  )

  if (isLoading || eventLoading || regLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown">
        <section id="event-details">
          {event && (
            <Fragment>
              <div className="event-details-image">
                <img src={Image} alt="" />
              </div>
              <div className="event-details-content">
                <small className="event-details-category">
                  {event.category_name} - <span className="event-details-category-upcoming">{event.status}</span>
                </small>
                <h1 className="event-details-title">
                  <span>{event.name}</span>
                  <span className="event-details-title-price">${event.price}</span>
                </h1>
                <div className="event-details-meta">
                  <div>
                    <h2 className="event-details-meta-title">Date</h2>
                    <p>
                      {new Date(event.date).getDate() +
                        ' ' +
                        monthNames[new Date(event.date).getMonth()] +
                        ' ' +
                        new Date(event.date).getFullYear()}
                    </p>
                  </div>
                  <div>
                    <h2 className="event-details-meta-title">Time</h2>
                    <p>{new Date(event.date).toLocaleTimeString('en', { timeStyle: 'short', hour12: true })}</p>
                  </div>
                  <div>
                    <h2 className="event-details-meta-title">Venue</h2>
                    <p>{event.venue}</p>
                  </div>
                </div>
                <p className="event-details-description">{event.meta_desc}</p>
                {user && event.status === 'upcoming' && registration && Object.keys(registration).length <= 0 && (
                  <Button content={'Get Ticket'} handleClick={handleClick} />
                )}
              </div>
            </Fragment>
          )}
        </section>
      </ScrollAnimation>
    </main>
  )
}
