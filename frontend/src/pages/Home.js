// react
import { Fragment } from 'react'

// components
import Services from '../components/Services/Services'
import Hero from '../components/Hero/Hero'
import Collaborators from '../components/Collaborators/Collaborators'
import ScrollToTop from '../components/ScrollToTop'

export default function Home() {
  return (
    <Fragment>
      <ScrollToTop />
      <main className="container">
        <Hero />
        <Services />
        <Collaborators />
      </main>
    </Fragment>
  )
}
