import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeReview, getReviews } from "../../store/reviews";
import { getSpot } from "../../store/spots";

const DeleteReviewModal = ({reviewId, spotId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()



    const handleSubmission = async(e) => {
        e.preventDefault();
        await dispatch(removeReview(reviewId))
        await dispatch(getSpot(spotId))
        await dispatch(getReviews(spotId))

        closeModal()
    }



    return (
        <div className="deleteBackground">
            <div className="deleteTxt">
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to delete this review?</h4>
            </div>
            <div className="buttsContainer">
                <button className="confirmYes" onClick={(e) => handleSubmission(e)}>
                    Yes (Delete Review)
                </button>


                <button className="confirmNo" onClick={closeModal}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
