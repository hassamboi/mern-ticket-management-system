// components
import EventList from './EventList'

// react
import { useState, useEffect } from 'react'

// library
import ReactPaginate from 'react-paginate'

export default function PaginatedEvents({ events, eventsPerPage }) {
  // We start with an empty list of events.
  const [currentEvents, setCurrentEvents] = useState(null)
  const [pageCount, setPageCount] = useState(0)

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 100)
    const endOffset = itemOffset + eventsPerPage
    setCurrentEvents(events.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(events.length / eventsPerPage))
  }, [itemOffset, eventsPerPage])

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * eventsPerPage) % events.length
    setItemOffset(newOffset)
  }

  return (
    <section id="events-cards">
      {currentEvents && currentEvents.length > 0 ? <EventList events={currentEvents} /> : 'No events to display.'}
      <ReactPaginate
        className="event-pagination"
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
      />
    </section>
  )
}
