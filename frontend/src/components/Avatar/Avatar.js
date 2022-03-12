import "./Avatar.css";
export default function Avatar({ image, alt, width, height, handleClick }) {
  return (
    <div className="avatar" onClick={handleClick} style={{ width: `${width}`, height: `${height}` }}>
      <img src={image} alt={alt} />
    </div>
  );
}
