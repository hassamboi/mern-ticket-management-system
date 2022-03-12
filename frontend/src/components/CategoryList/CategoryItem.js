export default function CategoryItem({ category, selected, setSelected }) {
  return (
    <li
      className={`${selected === category.id ? "event-category-selected" : ""}`}
      value={category.id}
      onClick={() => setSelected(category.id)}
    >
      {category.name}
    </li>
  );
}
