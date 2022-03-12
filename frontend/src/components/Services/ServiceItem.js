// single service item render
export default function ServiceItem({ title, desc, icon }) {
  return (
    <div className="service">
      {icon}
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
