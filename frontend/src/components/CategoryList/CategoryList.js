// react
import { Fragment, useState } from "react";

// components
import CategoryItem from "./CategoryItem";

// assets
import "./CategoryList.css";

export default function CategoryList({ categories }) {
  const updatedCategories = [
    { id: "all", name: "All" },
    { id: "upcoming", name: "Upcoming" },
    { id: "concluded", name: "Concluded" },
  ].concat(categories);

  const [selected, setSelected] = useState("all");

  return (
    <section id="event-categories">
      <h2>Event Categories</h2>
      <ol className="event-categories-list">
        {updatedCategories &&
          updatedCategories.map(category => (
            <Fragment key={category.id}>
              <CategoryItem category={category} selected={selected} setSelected={setSelected} />
            </Fragment>
          ))}
      </ol>
    </section>
  );
}
