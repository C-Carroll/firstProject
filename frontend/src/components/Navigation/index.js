// frontend/src/components/Navigation/index.js
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateSpot from "../CreateSpot"

function Navigation({ isLoaded}) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='sessionLinks'>
        <NavLink id='createSButt' to='/spot/new'>Rent your Home</NavLink>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
          <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
         <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className='rando'>
    <ul className="navBar">
      <li id='navHome'>
        <NavLink className="home" exact to="/">
        <i class="fa-solid fa-spaghetti-monster-flying"></i>
        </NavLink>
        <p>AriBnb</p>
      </li>
      {isLoaded && sessionLinks}
    </ul>
    {/* <div>{openModal && <LoginFormPage setModalOpen={setModalOpen}/>}</div> */}
    </div>
  );
}

export default Navigation;
