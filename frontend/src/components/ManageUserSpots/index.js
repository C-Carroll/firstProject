import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getUserSpots } from "../../store/spots";
import './userSpots.css'
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";


const ManageUserSpots = () => {
    const dispatch = useDispatch()
    const userSpots = useSelector((state) => state.spots.userSpots)
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if(sessionUser)dispatch(getUserSpots())
    },[dispatch, sessionUser])


    return(

        <div className="managePage">
        {((userSpots.length && sessionUser) ?
         <div>
            <div className="manageTitle">
                <h2>Manage Your Spots</h2>
                <Link to='/spot/new' id='manCreate'>
                <button className="manageSpotCreate">Create a New Spot</button>
                </Link>
            </div>
            <div className="manageSpotsContainer">
                {userSpots.map((spot) => (
                    <div className="manageSpot" title={spot.name}>
                        <Link className='manageSpotsLink' key={spot.id} to={`/spots/${spot.id}`}>
                            <img className='manageSpotImg' src={spot.previewImage} alt={`Preview of ${spot.name}`}/>

                            <ul className="manageSpotInfo">
                                <li id='spotLocation'>{spot.city}, {spot.state}</li>
                                {spot.avgRating ? <li id='spotRating'>{spot.avgRating}</li> : <li id='spotRating'>New! </li>}
                                <li id='spotPrice'>${spot.price}/night</li>
                            </ul>
                        </Link>
                        <ul className="buttons">

                            <li id='update'>
                                <Link to={`/spots/${spot.id}/edit`} id='updateLink'>
                                <button id='updateButt'>Update</button>
                                </Link>
                            </li>
                            <li id='delete'>
                                <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                                    name='deleteButt'
                                />
                            </li>

                        </ul>
                    </div>
                ))}
            </div>
         </div>


        : (!sessionUser ? <h2>please log in</h2>
        : <div className="noSpots">
            <h2>You have no spots 😭</h2>
            <h3>Thats okay! List your home here!</h3>
            <Link to='/spot/new' id='manCreate'>
                <button className="manageSpotCreate">Create a New Spot</button>
            </Link>
        </div>))}
        </div>

    )

}

export default ManageUserSpots
