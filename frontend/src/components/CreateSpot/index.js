import './createSpot.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"



import * as spotActions from '../../store/spots'




const CreateSpot = () => {
const sessionUser = useSelector((state) => state.session.user);
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
const [prevImg, setPrevImg]= useState('');
const [img2, setImg2]= useState('');
const [img3, setImg3]= useState('');
const [img4, setImg4]= useState('');
const [img5, setImg5]= useState('');
const [images, setImages]= useState([])
const [errors, setErrors]= useState({})

useEffect(() => {
   setImages([img2, img3, img4, img5])
}, [img2, img3, img4, img5])

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
   if(!prevImg) {
      err.prevImg = "Preview Image is required"
   } else if (/\.(jpg|jpeg|png)$/.test(prevImg) === false){
      err.prevImg = "Image URL needs to end in png or jpg (or jpeg)"
   }
   if(img2) {
      if(/\.(jpg|jpeg|png)$/.test(img2) === false){
      err.img2 = "Image URL needs to end in png or jpg (or jpeg)"
   }}
   if(img3) {
      if(/\.(jpg|jpeg|png)$/.test(img3) === false){
      err.img3 = "Image URL needs to end in png or jpg (or jpeg)"
   }}
   if(img4) {
      if(/\.(jpg|jpeg|png)$/.test(img4) === false){
      err.img4 = "Image URL needs to end in png or jpg (or jpeg)"
   }}
   if(img5) {
      if(/\.(jpg|jpeg|png)$/.test(img5) === false){
      err.img5 = "Image URL needs to end in png or jpg (or jpeg)"
   }}



   if(Object.values(err).length > 0){
      setErrors(err)
   } else {
      try{
         const spotInfo = {
            address,
            city,
            state,
            country,
            lat: lat ? lat : 0,
            lng: lng ?lng : 0,
            name,
            description,
            price
         }
         const newSpot = await dispatch(spotActions.makeNewSpot(spotInfo))
         console.log("created: ", newSpot, ' : ', newSpot.id)
         const spotId = newSpot.id
         if (spotId) {
            await dispatch(spotActions.makeSpotImages(spotId, {
            url: prevImg,
            preview: true
            }))

            for (let i = 0; i < images.length; i++){
               if (images[i]){
                  await dispatch(spotActions.makeSpotImages(spotId, {
                     url: images[i],
                     preview: false
                  }))
               }
            }
         }

         // function wait(time){
         //    return new Promise(resolve => {
         //       setTimeout(resolve, time)
         //    })
         // }
         // async function go() {
         //    await wait(5000);
         //    history.push(`/spots/${spotId}`)
         // }

      history.push(`/spots/${spotId}`)

      }
      catch (error) {
         console.log("errorss", error)
      }
   }


}


if (sessionUser) {
   return(
      <div className='createSpotPage'>

         <div className='formContainer'>
            <form onSubmit={handleSubmission}>
               <h1>Create a new Spot</h1>
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
               <div className='imageDetails'>
                  <h3>Liven up your spot with photos</h3>
                  <p>Submit a link to at least one photo to publish to your spot.</p>

                  <div className='linkInputs'>
                  <input
                     required
                     placeholder='Preview Image URL'
                     type='text'
                     value={prevImg}
                     onChange={((e) => setPrevImg(e.target.value))}
                  />
                  {errors.prevImg && <div className='createSpotErrors'>{errors.prevImg}</div>}
                  <input
                     placeholder='Second Image URL (optional)'
                     type='text'
                     value={img2}
                     onChange={((e) => setImg2(e.target.value))}
                  />
                  {errors.img2 && <div className='createSpotErrors'>{errors.img2}</div>}
                  <input
                     placeholder='Third Image URL (optional)'
                     type='text'
                     value={img3}
                     onChange={((e) => setImg3(e.target.value))}
                  />
                  {errors.img3 && <div className='createSpotErrors'>{errors.img3}</div>}
                  <input
                     placeholder='Fourth Image URL (optional)'
                     type='text'
                     value={img4}
                     onChange={((e) => setImg4(e.target.value))}
                  />
                  {errors.img4 && <div className='createSpotErrors'>{errors.img4}</div>}
                  <input
                     placeholder='Fifth Image URL (optional)'
                     type='text'
                     value={img5}
                     onChange={((e) => setImg5(e.target.value))}
                  />
                  {errors.img5 && <div className='createSpotErrors'>{errors.img5}</div>}
                  </div>
               </div>
               <div className='butt'>
               <button className="createButton" type='submit'>Create Spot</button>
               </div>
            </form>
         </div>
      </div>
   )
} else {
   return(
      <div className='createSpotPage'>
         <h1>NOT LOGGED IN</h1>
      </div>
   )
}

}
export default CreateSpot
