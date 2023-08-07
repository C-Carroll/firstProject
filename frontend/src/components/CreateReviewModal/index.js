import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./reviewModal.css"
import { postReview, getReviews } from "../../store/reviews";
import { getSpot } from "../../store/spots";



function CreateReviewModal(spotId) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [revTxt, setRevTxt]=useState('')
    const [stars, setStars] = useState(0)
    const [hoveredStar, setHoveredStar] = useState(stars)
    const [errors, setErrors] = useState({})


    const handleSubmission = async(e) => {
        e.preventDefault()
        setErrors({})
        let err = {}

        if(!revTxt){
            err.txt = "Must have Review"
        } else if (revTxt.length < 10){
            err.txt = 'Review must be longer than 10 characters'
        }
        if (stars < 1){
            err.stars = "Must leave star rating"
        }

        if(Object.values(err).length > 0){
            setErrors(err)

        } else {


                const newReview = {
                    stars,
                    review: revTxt
                }
                await dispatch(postReview(spotId.spotId, newReview))
                await dispatch(getReviews(spotId.spotId))
                await dispatch(getSpot(spotId.spotId))
                .then(closeModal)
                .catch(async (res) => {
                  const data = await res.json();
                  if (data && data.errors) {
                    setErrors(data.errors);
                  }
                });



        }
        // return (setErrors())
    }

    const buttOn = () => {
        if (revTxt.length < 10 || stars === 0) return true
        return false
    }

    return (
       <div className='reviewContainer'>
        <h3>How was your stay?</h3>
        <div className='reviewFormContainer'>
            <form onSubmit={handleSubmission}>
                <div id='revTxtArea'>
                    <textarea
                        id='reviewModalText'
                        placeholder="Leave your review here..."
                        value={revTxt}
                        onChange={(e) => setRevTxt(e.target.value)}
                    ></textarea>
                    {errors.txt && <div className='createReviewErrors'>{errors.txt}</div>}
                </div>


                <div className='starsContainer'>
                    <div className="stars">
                    <div
                        onMouseEnter={(() => setHoveredStar(1))}
                        onMouseLeave={(() => setHoveredStar(stars))}
                        onClick={(() => setStars(1))}>
                            <i className={`fa-star ${hoveredStar >= 1 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                    </div>

                    <div
                        onMouseEnter={(() => setHoveredStar(2))}
                        onMouseLeave={(() => setHoveredStar(stars))}
                        onClick={(() => setStars(2))}>
                            <i className={`fa-star ${hoveredStar >= 2 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                    </div>

                    <div
                        onMouseEnter={(() => setHoveredStar(3))}
                        onMouseLeave={(() => setHoveredStar(stars))}
                        onClick={(() => setStars(3))}>
                            <i className={`fa-star ${hoveredStar >= 3 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                    </div>

                    <div
                        onMouseEnter={(() => setHoveredStar(4))}
                        onMouseLeave={(() => setHoveredStar(stars))}
                        onClick={(() => setStars(4))}>
                            <i className={`fa-star ${hoveredStar >= 4 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                    </div>

                    <div
                        onMouseEnter={(() => setHoveredStar(5))}
                        onMouseLeave={(() => setHoveredStar(stars))}
                        onClick={(() => setStars(5))}>
                            <i className={`fa-star ${hoveredStar >= 5 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                    </div>

                    <p>Stars</p>
                    </div>
                    {errors.stars && <div className='createReviewErrors'>{errors.stars}</div>}
                </div>
                <button id='subButt' type='submit' disabled={buttOn()}>Submit Your Review</button>
            </form>
        </div>
       </div>
    )
}

export default CreateReviewModal
