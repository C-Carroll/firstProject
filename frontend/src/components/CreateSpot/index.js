import './createSpot.css'
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";




const CreateSpot = () => {
    const sessionUser = useSelector((state) => state.session.user)
 return (
    sessionUser ? <h3 id='tt'>loggedin only</h3> : <h3 id='tt'>are you logged in?</h3>
 )
}
export default CreateSpot
