import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './deleteSpot.css'
import { getUserSpots, removeSpot } from "../../store/spots";

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()



    const handleSubmission = async(e) => {
        e.preventDefault();
        await dispatch(removeSpot(spotId))
        await dispatch(getUserSpots())


        closeModal()
    }


    return (
        <div className="deleteBackground">
            <div className="deleteTxt">
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to delete this spot?</h4>
            </div>
            <div className="buttsContainer">
                <button className="confirmYes" onClick={(e) => handleSubmission(e)}>
                    Yes (Delete Spot)
                </button>


                <button className="confirmNo" onClick={closeModal}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    )
}

export default DeleteSpotModal
