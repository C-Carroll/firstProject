import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReviews } from '../../store/reviews'
import { Link } from "react-router-dom";
import './reviews.css'
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from '../DeleteReviewModal'


function Reviews ({spotId, user, spotOwnerId}) {
    const sessionUser = useSelector((state) => state.session.user)
    const [loggedIn, setLoggedIn] = useState(false)
    const [hasRev, setHasRev] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.reviews.reviews)

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])
    useEffect(() => {
        if(sessionUser){
            setLoggedIn(true)
            if (spotOwnerId === sessionUser.id){
                setIsOwner(true)
            } else setIsOwner(false)

        } else setLoggedIn(false)
    },[spotOwnerId, sessionUser])
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

        if(checker[0] === '0') return months[checker[1]]
        else return months[num]
    }
    const yearFinder = (date) => {
        let year = date.split('-')[0]
        return year
    }

    useEffect(() => {
        if (user) {
           reviews.map((rev) => {

                if(rev.userId === user.id) setHasRev(true)
                else{

                     setHasRev(false)

                }
                return 'done'
            })
        }
    }, [setHasRev, reviews, user])


    const CreateRevButt = () => {
        if(isOwner ^ hasRev) {
        } else if (sessionUser){

            return (
                <div className="realRevButt">
                    <OpenModalButton
                        buttonText='Write Review'
                        modalComponent={<CreateReviewModal spotId={spotId}/>}
                        name='buttForRev'
                    />

                </div>
            )
        }
    }

    const DeleteButt = (id, reviewId, spotId) => {
        if(id === sessionUser.id){
            return(
                <div className="deleteRevModalButt">
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteReviewModal reviewId={reviewId} spotId={spotId}/>}
                        name='deleteReview'
                    />
                </div>
            )
        }
    }


    return(
        <>
        <div className='revButton'>
            <CreateRevButt />
        </div>
        {reviews.length > 0 ?
        (reviews
            .sort((a,b) => b.id - a.id)
            .map((review) => (
        <div className="singleRev">
            <div className="reviewInfo">
                {/* <ReviewOwner reviewUserId={review.userId}/> */}
                <h4>{review.User.firstName}</h4>
                <h5>{monthFinder(review.createdAt)}, {yearFinder(review.createdAt)}</h5>
            </div>
            <div className='review'>
                <p>
                    {review.review}
                </p>
            </div>
            <div className="delButt">
                {sessionUser && DeleteButt(review.userId, review.id, review.spotId)}
            </div>
            <div className="line"></div>
        </div>
        ))) : (isOwner ? <div className="noRev">You Have No Reviews Yet</div> : <p className='noRev'>Be the first to post a review!</p>)
        // (reviews.map((rev) => (<p>{rev.id}</p>))) : <p>no reviews</p>
        }
        </>
    )
}
export default Reviews
