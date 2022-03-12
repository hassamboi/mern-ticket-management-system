// assets
import "./InputField.css";

export default function InputField(props) {
  // validation function
  const validate = (field, regex) => {
    if (regex.test(field.value)) {
      field.className = "form-input valid";
    } else {
      field.className = "form-input invalid";
    }
  };

  const required = props.required ? "required" : undefined;
  return (
    <input
      className="form-input"
      type={props.type}
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      maxLength={props.maxLength ? props.maxLength : "200"}
      accept={props.accept}
      value={props.value}
      onChange={e => props.handleChange(e)}
      onKeyUp={e => validate(e.target, props.pattern)}
      required={required}
    />
  );
}
