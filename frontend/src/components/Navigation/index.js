// frontend/src/components/Navigation/index.js
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Modal from "../LoginFormPage/LoginModal";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";

function Navigation({ isLoaded}) {
  const sessionUser = useSelector((state) => state.session.user);

  const [openModal, setModalOpen] = useState(false)

  function disableScroll (){
    window.onscroll = function () { window.scrollTo(0, 0) };
}
  function allowScroll (){
    window.onscroll = function (){}
  }

  useEffect(() => {
    if(openModal){
      disableScroll()
    } else {
      allowScroll()
    }
  })


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
        <NavLink to='/spots/new'>Create a New Spot</NavLink>
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login" className='sesh'>Log In</NavLink>
        <NavLink to="/signup" className='sesh'>Sign Up</NavLink>
      </li>
    );
  }

  return (
    <div className='rando'>
    <ul className="navBar">
      <li>
        <NavLink className="home" exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
    {/* <div>{openModal && <LoginFormPage setModalOpen={setModalOpen}/>}</div> */}
    </div>
  );
}

export default Navigation;
