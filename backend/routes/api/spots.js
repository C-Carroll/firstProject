const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, Spot_Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



const router = express.Router();

const validSpot = [
    check('address')
        .exists({checkFalsy: true})
        .isLength({min: 6})
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage("City is required"),
    check("state")
        .exists({checkFalsy: true})
        .withMessage("State is required"),
    check("country")
        .exists({checkFalsy: true})
        .withMessage("Country is required"),
    check("lat")
        .exists({checkFalsy: true})
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({checkFalsy: true})
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({checkFalsy: true})
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({checkFalsy: true})
        .withMessage("Description is required"),
    check("price")
        .exists({checkFalsy: true})
        .withMessage("Price per day is required"),
    handleValidationErrors,
];



/*------------------------------------------------------*/

//GET CURRENT USER'S SPOTS
router.get('/current',requireAuth, async(req, res) => {
    //get prev image


    const findAllUserSpots = await Spot.findAll({
        where: {
            ownerID: req.user.dataValues.id
        }
    })

    res.json({Spots: findAllUserSpots})
})

/*------------------------------------------------------*/

//GET ALL SPOTS
router.get(
    '/',
    async (req, res) => {
        let arr = []
        let allDataSpots = await Spot.findAll()

        allDataSpots.forEach(spot => { arr.push(spot.dataValues) });

        if (arr.length >= 1) res.json({ spot: [...arr] });
        else return res.json({ spot: null });
});

/*------------------------------------------------------*/

// CREATE AN IMAGE FOR A SPOT
router.post('/:spotId/images', requireAuth, async(req, res) => {
    let spotId = Number(req.params.spotId)
    const userId = req.user.id
    const spot = await Spot.findOne({
        where: {
            spotId: spotId,
            ownerId: userId
    }})
    if(!spot) return res.status(404).json({message: "Spot couldn't be found"})

    const { url, preview } = req.body
    let newPhoto;

    const images = await Spot_Image.findAll({
        where: {
            spotId: spotId
        },
    })
    if (preview === true){
        images.forEach(photo => {
            if (photo.preview === true) throw new Error ('Cannot have two preview images')
        })
    }
    try{
        if (preview === true){
            const prevImgUpdate = await Spot.update(
                {previewImage: url},
                {where: {id: spotId}}
            )
        }

        newPhoto = await Spot_Image.create({
            spotId: spotId,
            spotPhotoUrl: url,
            preview
        })

        const addedPhoto = {
            id: newPhoto.id,
            url: newPhoto.spotPhotoUrl,
            preview: newPhoto.preview
        }
        res.json(addedPhoto)
    }
    catch(error){
        console.error("Error creating photo:", error);
        if (newPhoto) {
          await newPhoto.destroy();
        }
        res.status(500).json({ message: "Error creating image" });
    }
})

/*------------------------------------------------------*/

//EDIT A SPOT
router.put('/:spotId', requireAuth, async(req, res) => {
    const spotId = Number(req.params.spotId);
    const userId = req.user.id;
    const spot = await Spot.findOne({
        where: {
            Id: spotId,
            ownerId: userId
        }
    })
    if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

    try{
        await spot.update(req.body)

        const updated = await Spot.findOne({
            where: {
                Id: spotId,
                ownerId: userId
            }
        })
        res.status(200).json(updated)
    }
    catch(error){
        res.status(500).json({"message": "could not update"})

    }
})


/*------------------------------------------------------*/

//GET SPOT BY ID
router.get("/:spotId", async(req, res) => {
    //find spot
    let id;
   if(Number.isInteger(Number(req.params.spotId)) === true) {
    id = Number(req.params.spotId)
   } else console.log('failll') ///MAKE THIS THROW AN ERROR
   const spot = await Spot.findByPk(id)
   if(!spot) res.status(404).json({message: "Spot couldn't be found"})

   //find owner
   const owner = await User.findByPk(spot.ownerId);
   const ownerInfo = {
    id: owner.id,
    firstName: owner.firstName,
    lastName: owner.lastName
   }

   //find images
   const images = await Spot_Image.findAll({
    where: {
        spotId: id
    },
    attributes: [
        "id",
        ["spotPhotoUrl", "url"] ,
        "preview"
    ]
    })
   // const imgArr
   // console.log(images)

   //format
   let spotInfo ={
   id: spot.id,
   ownerId: spot.ownerId,
   address: spot.address,
   city: spot.city,
   state: spot.state,
   country: spot.country,
   lat: spot.lat,
   lng: spot.lng,
   name: spot.name,
   description: spot.description,
   price: spot.price,
   createdAt: spot.createdAt,
   updatedAt:  spot.updatedAt,
   numReviews: 0, ///fix this when access
   avgStarRating: spot.avgStarRating,
   SpotImages: images,
   Owner: ownerInfo
   }

   console.log(owner)

   //need to add spot images and owners - DONE

   res.json(spotInfo)
})

/*------------------------------------------------------*/

// CREATE NEW SPOT
router.post('/', validSpot, requireAuth, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let newSpot;

    console.log(address)
    try{
        newSpot = await Spot.create({
            ownerId: req.user.id,
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

        const addedSpot = {
            spotId: newSpot.id,
            ownerId: newSpot.ownerId,
            address: newSpot.address,
            city: newSpot.city,
            state: newSpot.state,
            country: newSpot.country,
            lat: newSpot.lat,
            lng: newSpot.lng,
            name: newSpot.name,
            description: newSpot.description,
            price: newSpot.price,
        }
    res.status(201).json(addedSpot)
    }
    catch (error) {
        console.error("Error creating spot:", error);
        if (newSpot) {
          await newSpot.destroy();
        }
        res.status(500).json({ message: "Error creating spot" });
    }

});

module.exports = router;
