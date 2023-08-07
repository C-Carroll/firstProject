import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpot } from "../../store/spots";

import "./Spot.css";
import Reviews from "../Reviews";
import { Link } from "react-router-dom";


const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spot);
  // const owner = useSelector((state) => state.spots.spot.Owner);
  // console.log(spot, owner)
  const user = useSelector((state) => state.session.user )
  if (user){ const userId = user.id}

  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch, spotId]);

  const Photos = () => {
    let prev;
    let reg = [];
    (spot.SpotImages || []).forEach((photo) => {
      if (photo.preview) prev = photo
      else reg.push(photo)
    });

    return(

      <>
      {prev && <img className='prevImg' src={prev.url} alt={`Preview of ${spot.name}`}/>}
      <div className="regImg" >
      {reg ? reg.map((photo) => (
        <img src={photo.url} id='photos' alt='Spot images'/>
      )): <></>}
      </div>
      </>
    )

  }

  // const hostedBy = () => {
  //   if(owner){
  //     return (<p>Hosted by {owner.firstName}, {owner.lastName}</p>)
  //   }
  // }
  const hostedBy = () => {

    return (
      spot?.Owner?.firstName?
     <p>{ `Hosted by ${spot.Owner.firstName}, ${spot.Owner.lastName}`}</p>
     : <div>...loading</div>
    )
  }

  // console.log(spot)
  return (
  <div>
    {spot && (
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
          <p id='host'>{hostedBy()}</p>
          <span id='descript'>{spot.description}</span>
        </div>
        <div className="spotReserve">
          <div id='sPrice'>${spot.price} night</div>
          <div className='resRevStats'>
           <i id='resStar' class="fa-solid fa-star"></i>
           {spot.avgStarRating ? <h3 className='resAvg'>{(Math.round((spot.avgStarRating) * 10) / 10)} • {spot.numReviews}{spot.numReviews === 1 ? ' Review' : ' Reviews'}</h3> : <h3>New!</h3>}
          </div>
          {/* <div id='sRating'>{spot.avgStarRating ? (Math.round((spot.avgStarRating) * 10) / 10) : 'New!'}</div> */}
          <button id='sReserve' onClick={() => {
            return(alert("Feature Coming Soon!"))
          }}>Reserve</button>
        </div>
      </div>

      </div>
      <div className="reviewsForSpot">
        <div className="spotRevInfo">
          <div className='revStats'>
           <i id='star' class="fa-solid fa-star"></i>
           {spot.avgStarRating ? <h3>{(Math.round((spot.avgStarRating) * 10) / 10)} • {spot.numReviews}{spot.numReviews === 1 ? ' Review' : ' Reviews'}</h3> : <h3>New!</h3>}
          </div>

        </div>
          <Reviews spotId={spotId} user={user} spotOwnerId={spot.ownerId}/>
      </div>

    </div>)}

    </div>);
};

export default SpotDetails
