const tg = window.Telegram.WebApp;

export default function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  const user = tg.initDataUnsafe?.user;
  const queryId = tg.initDataUnsafe?.query_id

  return {tg, onClose, onToggleButton, user, queryId}
}
