import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReviews } from '../../store/reviews'
import { Link } from "react-router-dom";
import './reviews.css'


function Reviews ({spotId}) {
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.reviews.reviews)
    console.log(reviews)
    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])
    // let review = (reviews) = async() => {
    //     let rev = await reviews().Reviews
    //     return rev
    // }

    let months =  {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'june',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    const monthFinder = (date) => {
        let num = date.split('-')[1]
        let checker = num.split('')
        console.log('month = ', checker[1], months[checker[1]])
        if(checker[0] === '0') return months[checker[1]]
        else return months[num]
    }
    const yearFinder = (date) => {
        let year = date.split('-')[0]
        return year
    }

    return(
        <>
        {reviews ?
        (reviews.map((review) => (
        <div>
            <div className="reviewInfo">
                <h4>{review.User.firstName}</h4>
                <h5>{monthFinder(review.createdAt)}, {yearFinder(review.createdAt)}</h5>
            </div>
            <div className='review'>
                <p>
                    {review.review}
                </p>
            </div>
        </div>
        ))) : <p>no reviews</p>
        // (reviews.map((rev) => (<p>{rev.id}</p>))) : <p>no reviews</p>
        }
        </>
    )
}
export default Reviews
