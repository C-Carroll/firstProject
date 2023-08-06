import { csrfFetch } from "./csrf"

const SET_REVIEWS = 'reviews/spotReviews'
const SET_REVIEW = 'reviews/getReview'

const spotReviews = (review) => ({
    type: SET_REVIEWS,
    payload: review,
})
const getReview = (review) => ({
    type: SET_REVIEW,
    payload: review
})


export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const list = await response.json()
        dispatch(spotReviews(list.Reviews))
        console.log(list.Reviews)
        return response
    }
}

export const postReview = (spotId, newReview) => async(dispatch) => {
     const {review, stars} = newReview
     const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            stars,
            review
        })
     });
     if(response.ok){
        const rev = await response.json()
        dispatch(getReview(rev))
        return rev
     }

}

const initialState = {
    reviews: [],
    review: null
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            console.log(action.payload)
            return {
                ...state,
                reviews: action.payload
            }
        case SET_REVIEW:
            return{
                ...state,
                review: action.payload
            }
        default: return state
    }
}

export default reviewReducer
