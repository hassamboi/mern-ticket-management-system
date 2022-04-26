import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// components and pages
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'

// assets
import Footer from './components/Footer/Footer'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import EventDetails from './pages/EventDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
