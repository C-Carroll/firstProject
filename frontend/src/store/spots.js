const SPOTS = "spots/allSpots";

const allSpots = (spots) => ({
  type: SPOTS,
  payload: spots,
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const list = await response.json();
    dispatch(allSpots(list.Spots));
    // console.log(list.Spots)
  }
};

// export const getSpot = (spotId) = async(dispatch) => {
//     const response = await fetch("/api/spots/:spotId")
// }

const initialState = {
  spots: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
      default: return state
  }
};

export default spotsReducer
