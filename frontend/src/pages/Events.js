// components
import PaginatedEvents from "./../components/PaginatedEvents/PaginatedEvents";
import Search from "../components/Search/Search";
import CategoryList from "../components/CategoryList/CategoryList";
import ScrollToTop from "../components/ScrollToTop";

// library
import ScrollAnimation from "react-animate-on-scroll";

// react
import { useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Gaming Night",
      price: 25.0,
      date: "31st Jan, 2022",
      time: "8:00 PM",
      venue: "FAST NUCES, Peshawar",
      concluded: true,
    },
    {
      id: 2,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 3,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 4,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 5,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 6,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 7,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 8,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
    {
      id: 9,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: true,
    },
    {
      id: 10,
      name: "React Workshop",
      price: 10.0,
      date: "10th Feb, 2022",
      time: "11:00 AM",
      venue: "FAST NUCES, Peshawar",
      concluded: false,
    },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Entertainment" },
    { id: 2, name: "Workshops" },
    { id: 3, name: "Seminars" },
  ]);
  return (
    <main className="container">
      <ScrollToTop />
      <ScrollAnimation animateIn="fadeInDown" duration={0.5}>
        <Search events={events} setEvents={setEvents} />
        <section id="events" className="main-events-grid" style={{ padding: 0 }}>
          <CategoryList categories={categories} />
          <PaginatedEvents events={events} eventsPerPage={4} />
        </section>
      </ScrollAnimation>
    </main>
  );
}
