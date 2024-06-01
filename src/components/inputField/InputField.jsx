import './InputField.css';

export default function InputField({name, type, placeholder, required}) {
  return (
    <input
      className="inputField"
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  );
}
