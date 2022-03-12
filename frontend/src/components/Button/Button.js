// assets
import "./Button.css";

export default function Button({ content, disabled, type, handleClick }) {
  return !disabled ? (
    <button type={type} onClick={handleClick} className="call-btn">
      {content}
    </button>
  ) : (
    <div className="call-btn disabled-call-btn">Unavailable</div>
  );
}
