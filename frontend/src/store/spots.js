const SPOTS = "spots/allSpots";
const SPOT = "spot/singleSpot"

const allSpots = (spots) => ({
  type: SPOTS,
  payload: spots,
});
const singleSpot = (spot) => ({
    type: SPOT,
    payload: spot,
})

export const getSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  console.log(response)

  if (response.ok) {
    const list = await response.json();
    dispatch(allSpots(list.Spots));
    // console.log(list.Spots)
  }
};

export const getSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    console.log(response)

    if (response.ok){
        console.log(response)
        const spot = await response.json()
        dispatch(singleSpot(spot))
    }
    else{console.log('no good')}
}


const initialState = {
  spots: [],
  spot: null
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
    default: return state
  }
};

export default spotsReducer
