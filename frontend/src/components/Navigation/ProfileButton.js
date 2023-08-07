import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { NavLink, Link, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="navButton">
      <button onClick={openMenu}>
      <i className="fa-regular fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className='bottomLine'>
        <li>Hello, {user.username}</li>
        <li>{user.email}</li>
        </div>
        <li>
          <NavLink id='manSpotLink' to='/spots/current'>Manage Spots</NavLink>
        </li>

        <li className="logoutCont">
          <Link to='/'>
          <button className="logoutButt" id='sixtwosix'onClick={logout}>Log Out</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
