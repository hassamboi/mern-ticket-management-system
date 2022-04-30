// components
import PaginatedEvents from './../components/PaginatedEvents/PaginatedEvents'
import Search from '../components/Search/Search'
import CategoryList from '../components/CategoryList/CategoryList'
import ScrollToTop from '../components/ScrollToTop'

// library
import ScrollAnimation from 'react-animate-on-scroll'
import { toast } from 'react-toastify'

// react
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './../components/Spinner/Spinner'
import { useEffect } from 'react'
import { getEvents, reset } from '../features/events/eventSlice'

export default function Events() {
  const dispatch = useDispatch()
  const { events, isLoading, isError, message } = useSelector(state => state.events)

  // Get the events
  useEffect(() => {
    if (isError) {
      toast.error(message, { position: 'bottom-left' })
    }
    dispatch(getEvents())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const [categories, setCategories] = useState([
    { id: 1, name: 'Entertainment' },
    { id: 2, name: 'Workshops' },
    { id: 3, name: 'Seminars' },
  ])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown">
        <Search />
        <section id="events" className="main-events-grid" style={{ padding: 0 }}>
          <CategoryList categories={categories} />
          <PaginatedEvents events={events} eventsPerPage={4} />
        </section>
      </ScrollAnimation>
    </main>
  )
}
