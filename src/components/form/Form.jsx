import {useCallback, useEffect, useRef} from "react";

import "./Form.css";

import useTelegram from "../../hooks/useTelegram";
import {InputField} from "../inputField";

export default function Form() {
  const {tg} = useTelegram();

  const formRef = useRef(null);

  const onSendData = useCallback(() => {

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    tg.sendData(JSON.stringify(data));
  }, [tg])

  useEffect(() => {
    tg.MainButton.setParams({text: 'Send'});
    tg.MainButton.show();

    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData, tg]);

  // useEffect(() => {
  //   tg.MainButton.show();
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log("FORM DATA", data);

    if (e.target.checkValidity()) {
      console.log("FORM DATA IS VALID");
      // tg.sendData(JSON.stringify(data));
    }
  }

  return (
    <div className="form">
      <h3>Enter your data</h3>

      <form onSubmit={handleSubmit} ref={formRef}>
        <InputField name="name" type="text" placeholder="Enter your name" required />
        <InputField name="surname" type="text" placeholder="Enter your surname" required />

        <InputField name="email" type="email" placeholder="Enter your email" required />
        <InputField name="phone" type="tel" placeholder="Enter your phone number" required />

        <InputField name="address" type="text" placeholder="Enter your address" required />
        <InputField name="city" type="text" placeholder="Enter your city" required />
        <InputField name="country" type="text" placeholder="Enter your country" required />

        <fieldset>
          <legend>Choose your gender</legend>
          <label>
            <input type="radio" name="gender" value="male" defaultChecked />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female"/>
            Female
          </label>
        </fieldset>

        <select name="activity">
          <option value="entrepreneur">Entrepreneur</option>
          <option value="student">Student</option>
          <option value="other">Other</option>
        </select>
      </form>

    </div>
  );
}
