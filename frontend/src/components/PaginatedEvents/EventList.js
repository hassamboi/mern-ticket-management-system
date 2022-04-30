// react
import { Fragment } from 'react'

// components
import EventItem from './EventItem'

export default function EventList({ events }) {
  return events.map(event => (
    <Fragment key={event.event_id}>
      <EventItem event={event} />
    </Fragment>
  ))
}
