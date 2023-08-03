import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpot } from "../../store/spots";
import { getReviews } from '../../store/reviews'
import "./Spot.css";
import Reviews from "../Reviews";
import { Link } from "react-router-dom";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spot);

console.log(spotId)
  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch, spotId]);

  const Photos = () => {
    let prev;
    let reg = []
    spot.SpotImages.forEach((photo) => {
      if (photo.preview) prev = photo
      else reg.push(photo)
    })

    return(
      <>
      <img className='prevImg' src={prev.url} alt={`Preview of ${spot.name}`}/>
      <div className="regImg" >
      {reg ? reg.map((photo) => (
        <img src={photo.url} id='photos' alt='Spot images'/>
      )): <></>}
      </div>
      </>
    )

  }


  return (
  <div>
    {spot ?
    <div className='spotPage'>
      <div className="spotDetails">
        <div className="spotHeader">
      <h1 id='spotName'>{spot.name}</h1>
      <p id="locationInfo">
        {spot.city}, {spot.state}, {spot.country}
      </p>
      </div>
      <div className="spotImages">
        <Photos/>
      </div>
      <div className="spotInformation">
        <div className="spotText">
          <span id='host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</span>
          <span id='descript'>{spot.description}</span>
        </div>
        <div className="spotReserve">
          <div id='sPrice'>${spot.price} night</div>
          <div id='sRating'>{spot.avgRating ? spot.rating : 'New!'}</div>
          <button id='sReserve' onClick={() => {
            return(alert("Feature Coming Soon!"))
          }}>Reserve</button>
        </div>
      </div>

      </div>
      <div className="reviewsForSpot">
        <div className="spotRevInfo">
          <div id='star'>
           <i class="fa-solid fa-star"></i>
           {spot.avgStarRating ? <h3>{spot.avgStarRating} • {spot.numReviews} reviews</h3> : <h3>New!</h3>}
          </div>

        </div>
          <Reviews spotId={spotId} />
      </div>

    </div>
    : <h3>No Spot Found</h3>}
    </div>);
};

export default SpotDetails
