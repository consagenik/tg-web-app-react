import "./Header.css";

import useTelegram from "../../hooks/useTelegram";

import {Button} from "../button";

export default function Header() {
  const {onClose, onToggleButton, user} = useTelegram();

  return (
    <header>
      <Button onClick={onClose} text="Close" />

      <span className="username">{user?.username}</span>

      {/*<Button onClick={onToggleButton} text="Toggle" />*/}
    </header>
  );
}
