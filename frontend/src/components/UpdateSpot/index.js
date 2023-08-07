
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './updateSpot.css'



import * as spotActions from '../../store/spots'




const UpdateSpot = () => {
const sessionUser = useSelector((state) => state.session.user);
const spot = useSelector((state) => state.spots.spot);
const dispatch = useDispatch()
const history = useHistory()
const [address, setAddress]= useState("");
const [city, setCity]= useState('');
const [state, setState]= useState('');
const [country, setCountry]= useState('');
const [lat, setLat]= useState('');
const [lng, setLng]= useState('');
const [name, setName]= useState('');
const [description, setDescription]= useState('');
const [price, setPrice]= useState('');
const [isOwner, setIsOwner]= useState(false)
const [errors, setErrors]= useState({})
const { spotId } = useParams();
// console.log((spot ? spot : 'loading'))
useEffect(() => {
    dispatch(spotActions.getSpot(spotId))
  }, [dispatch, spotId]);

const handleSubmission = async(e) => {
   e.preventDefault()

   setErrors({})
   let err = {}
   if (!address){
      err.address = "Address is required"
   } else if (address.length < 6){
      err.address = "Invalid Address - Address must be more than 6 characters"
   }
   if(!city){
      err.city = "City is required"
   }
   if(!state){
      err.city = "City is required"
   }
   if(!country){
      err.country = "Country is required"
   }
   if(!name) {
      err.name = "Name is required"
   } else if (name.length > 50) {
      err.name = "Name must be less than 50 characters"
   }
   if(description.length < 30 || !description) {
      err.description = "Description must be longer than 30 characters"
   }
   if(!price) {
      err.price = "Price is required"
   } else if (parseInt(price) <= 0){
      err.price = "Price must be greater than 0"
   }
   if(!lat){
    setLat(5)
   } else if (Math.abs(lat) > 180){
    err.lat = "Lattitude must be between -90 and 90"
   }
   if(!lng){
    setLng(5)
   } else if (Math.abs(lng) > 180){
    err.lng = "Longitude must be between -180 and 180"
 }


   if(Object.values(err).length > 0){
      setErrors(err)
   } else {
   //  console.log('hit')
      try{
      //   console.log('start')
      //   console.log(address)
         const spotInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
         }
         await dispatch(spotActions.updateSpot(spotId, spotInfo))





      await history.push(`/spots/${spotId}`)

      }
      catch (error) {
         console.log("errorss", error)
         // console.log('wot')
      }
   }


}
useEffect(() => {
    if (spot){
        setAddress(spot.address);
        setCity(spot.city)
        setCountry(spot.country);
        setState(spot.state)
        setLat(spot.lat)
        setLng(spot.lng)
        setDescription(spot.description)
        setPrice(spot.price)
        setName(spot.name)
        if(sessionUser){
        if(sessionUser.id === spot.ownerId) setIsOwner(true)
        }
    }


}, [spot, sessionUser])


return(

    <div className="managePage">
    {((spot && isOwner ) ?
         <div className="updateSpotPage">
         <div className='formContainer'>
         <form onSubmit={handleSubmission}>
            <h1>Update Your Spot</h1>
            <div className='locationDetails'>
               <h3>Where's your place located?</h3>
               <p>Guests will only get your exact address once they booked a reservation</p>
               <div className='locationGrid'>
                  <label id='country'>
                     Country
                     <input
                        required
                        placeholder='Country'
                        type='text'
                        value={country}
                        onChange={((e) => setCountry(e.target.value))}
                     />
                     {errors.country && <div className='createSpotErrors'>{errors.country}</div>}
                  </label>
                  <label id='address'>
                     Street Address
                     <input
                        required
                        placeholder='Street Address'
                        type='text'
                        value={address}
                        onChange={((e) => setAddress(e.target.value))}
                     />
                     {errors.address && <div className='createSpotErrors'>{errors.address}</div>}
                  </label>
                  <label id='city'>
                     City
                     <input
                        required
                        placeholder='City'
                        type='text'
                        value={city}
                        onChange={((e) => setCity(e.target.value))}
                     />
                     {errors.city && <div className='createSpotErrors'>{errors.city}</div>}
                  </label>
                  <label id='state'>
                     State
                     <input
                        required
                        placeholder='State'
                        type='text'
                        value={state}
                        onChange={((e) => setState(e.target.value))}
                     />
                     {errors.state && <div className='createSpotErrors'>{errors.state}</div>}
                  </label>
                  <label id='lat'>
                     Latitide
                     <input
                        placeholder='Latitude (optional)'
                        type='number'
                        value={lat}
                        onChange={((e) => setLat(e.target.value))}
                     />
                     {errors.lat && <div className='createSpotErrors'>{errors.lat}</div>}
                  </label>
                  <label id='lng'>
                     Longitude
                     <input
                        placeholder='Longitude (optional)'
                        type='number'
                        value={lng}
                        onChange={((e) => setLng(e.target.value))}
                     />
                     {errors.lng && <div className='createSpotErrors'>{errors.lng}</div>}
                  </label>
               </div>
            </div>

            <div className='describeSpot'>
               <h3>Describe your place to guests</h3>
               <p>
                  Mention the best features of your space, any special amentities like
                  fast wifi or parking, and what you love about the neighborhood.
               </p>
               <textarea
                  id='descriptionTextArea'
                  required
                  placeholder='Please write at least 30 characters'
                  value={description}
                  onChange={((e) => setDescription(e.target.value))}
               >
               </textarea>
               {errors.description && <div className='createSpotErrors'>{errors.description}</div>}
            </div>

            <div className='nameInput'>
               <h3>Create a title for your spot</h3>
               <p>
                  Catch guests' attention with a spot title that highlights what makes
                  your place special
               </p>

               <input
                  required
                  placeholder='Name of your spot'
                  type='text'
                  value={name}
                  onChange={((e) => setName(e.target.value))}
               />
               {errors.name && <div className='createSpotErrors'>{errors.name}</div>}
            </div>

            <div className='priceInput'>
               <h3>Set a base price for your spot</h3>
               <p>
                  Competative pricing can help ypur listing stand out and rank higher
                  in search results
               </p>

               <input
                  required
                  placeholder='Price per night (USD)'
                  type='number'
                  value={price}
                  onChange={((e) => setPrice(e.target.value))}
               />
               {errors.price && <div className='createSpotErrors'>{errors.price}</div>}
            </div>
            <div className='butt'>
            <button className="createButton" type='submit'>Update Spot</button>
            </div>
         </form>
      </div>
      </div>


    : (!sessionUser ? <h2>please log in</h2> : (!isOwner ?<h2>Access Denied</h2>:<h2>...loading</h2>)))}
    </div>

)

}
export default UpdateSpot
