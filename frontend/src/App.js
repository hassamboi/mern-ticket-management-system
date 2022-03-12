import { BrowserRouter, Routes, Route } from "react-router-dom";

// components and pages
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";

// assets
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import EventDetails from "./pages/EventDetails";

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;