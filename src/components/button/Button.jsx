import './Button.css';

export default function Button({text, type = 'button', onClick}) {
  return (
    <button className="button" type={type} onClick={onClick}>{text}</button>
  );
}
