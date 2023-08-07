import { csrfFetch } from "./csrf";

const SPOTS = "spots/allSpots";
const SPOT = "spot/singleSpot"
const SPOT_IMAGES = "spot/spotImages"
const SPOT_REVS = "spot/spotReviews"
const USER_SPOTS = "spots/userSpots"
const DELETE_SPOT = 'spots/deleteSpot'

const allSpots = (spots) => ({
  type: SPOTS,
  payload: spots,
});
const singleSpot = (spot) => ({
    type: SPOT,
    payload: spot,
})
const spotImages = (image) => ({
  type: SPOT_IMAGES,
  payload: image
})
const spotReviews = (reviews) => ({
  type: SPOT_REVS,
  payload: reviews
})
const userSpots = (userSpots) => ({
  type: USER_SPOTS,
  payload: userSpots
})
const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId
})
export const removeSpot = (spotId) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {method: 'DELETE'})
  if (response.ok){
    dispatch(deleteSpot(spotId))
  }
}
export const getUserSpots = () => async(dispatch) => {
  // console.log('is this working')
  const response = await csrfFetch('/api/spots/current')
  // console.log(response)
  if(response.ok){
    // console.log('resp ok')
    const list = await response.json()
    dispatch(userSpots(list.Spots))
    // console.log(list.Spots)
    return list
  }
}
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  // console.log(response)

  if (response.ok) {
    const list = await response.json();
    dispatch(allSpots(list.Spots));
    return response;
    // console.log(list.Spots)
  }
};

export const getSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log(response)

    if (response.ok){
        // console.log(response)
        const spot = await response.json()
        dispatch(singleSpot(spot))
        return response;
    }
    else{console.log('no good')}
}

export const makeNewSpot = (spot) => async(dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price } = spot
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  })
  if (response.ok) {
    const newSpot = await response.json()
    dispatch(singleSpot(newSpot))
    // console.log(singleSpot(newSpot))
    // console.log(response)
    return newSpot;
  } else throw new Error ('action failed')
}

export const makeSpotImages = (spotId, image) => async(dispatch) => {
  const { url, preview } = image
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({
      url,
      preview
    })
  }
  )

  if (response.ok){
    const newImage = await response.json()
    dispatch(spotImages(newImage))
    // console.log(newImage)
    return newImage;
  }
}

export const updateSpot = (spotId, spot) => async(dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price } = spot
  const response = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'PUT',
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })
  })
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(singleSpot(updatedSpot))
    return response;
  } else throw new Error ('action failed')

}

export const getReviews = (spotId) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if(response.ok){
    const list = await response.json()
    dispatch(spotReviews(list.Reviews))
    // console.log(list.Reviews)
    return response
  }
}


const initialState = {
  spots: [],
  spot: null,
  images: [],
  reviews: [],
  userSpots: []
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPOTS:
      return {
        ...state,
        spots: action.payload,
    };
    case SPOT:
        return {
          ...state,
          spot: action.payload
    }
    case SPOT_IMAGES:
      return {
        ...state,
        images: action.payload
    }
    case SPOT_REVS:
      return {
        ...state,
        reviews: action.payload
    }
    case USER_SPOTS:
    return {
      ...state,
      userSpots: action.payload
    }
    default: return state
  }
};

export default spotsReducer
