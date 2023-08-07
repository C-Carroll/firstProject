import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonOff, setButtonOff] = useState(true)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            console.log(Object.values(errors).join())
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  useEffect(() => {
    if(email && firstName && lastName && (username.length >= 4) && (password.length >= 6)){
        setButtonOff(false)
    }
  })

  return (
    <div className="signUpBack">
      <h1>Sign Up</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label className="emailTxt">
          Email
          <input
          className="emailInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='errors'>{errors.email}</p>}
        <label className='usernameTxt'>
          Username
          <input
            className="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='errors'>{errors.username}</p>}
        <label className='firstTxt'>
          First Name
          <input
            className='firstInput'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='errors'>{errors.firstName}</p>}
        <label className='lastTxt'>
          Last Name
          <input
            className='lastInput'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='errors'>{errors.lastName}</p>}
        <label className='pswrdTxt'>
          Password
          <input
            className='pswrdInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errors'>{errors.password}</p>}
        <label className='conTxt'>
          Confirm Password
          <input
            className='conInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='errors'>{errors.confirmPassword}</p>
        )}
        {/* <div className="errors">
        {(Object.values(errors).length > 0) && <p className="errors">{Object.values(errors).join()}</p> }
        </div> */}
        <button disabled={buttonOff} className='subSignUp' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
