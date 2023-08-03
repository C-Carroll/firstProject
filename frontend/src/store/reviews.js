const SET_REVIEWS = 'reviews/spotReviews'

const spotReviews = (review) => ({
    type: SET_REVIEWS,
    payload: review,
})

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const list = await response.json()
        dispatch(spotReviews(list.Reviews))
        console.log(list.Reviews)
    }
}

const initialState = {
    reviews: []
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            console.log(action.payload)
            return {
                ...state,
                reviews: action.payload

            }
        default: return state
    }
}

export default reviewReducer
