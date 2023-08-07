import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isOff, setIsOff]=useState('true')
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demo = (e) => {
    // e.preventDefault();
    setCredential('DemoUser')
    setPassword('demo1234')
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  useEffect(() => {
    if((credential.length >= 4) && (password.length >= 6)) setIsOff(false)
  },[credential, password])

  const buttOn = () => {
    if (credential.length < 4 || password.length < 6 ) return true
    return false
}

  return (
    <div className="loginModalCon">
      <h1>Log In</h1>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label className="usernametxt">
          Username or Email
          <input
          className="usernameinput"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="passwordtxt">
          Password
          <input
          className="passwordinput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p id="logErr">{errors.credential}</p>
        )}
        <div className="theOptions">
        <button disabled={buttOn()} className='loginButton'type="submit">Log In</button>
        <button className="demoUser" onClick={(() => demo())}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
