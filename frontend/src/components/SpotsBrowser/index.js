import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getSpots } from "../../store/spots";
import './Spots.css'
import { Link } from "react-router-dom";

const SpotsBrowser = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots)
  console.log(spots)


  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])


  return (
    <div className="spotsPage" >
      <h1>Places to Stay</h1>
      <div className="spotsContainer">
      {spots ? (
        spots.map((spot) => (
          <div className="spot" title={spot.name}>
            <Link key={spot.id} to={`/spots/${spot.id}`} className='spotsLink'>

            <img className='spotImg' src={spot.previewImage} alt={`Preview of ${spot.name}`}/>


            <ul className='spotInfo'>
              <li id='spotLocation'>{spot.city}, {spot.state}</li>
              {spot.avgRating ? <li id='spotRating'>{spot.avgRating}</li> : <li id='spotRating'>New! </li>}
              <li id='spotPrice'>${spot.price}/night</li>
            </ul>


            </Link>
          </ div>
        ))
      ): <h3> Currently No Spots </h3>}
      </div>

    </div>
  );
};

export default SpotsBrowser
