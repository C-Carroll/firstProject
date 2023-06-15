const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();

const validReview = [
    check('review')
        .exists({checkFalsy: true})
        .isLength({min: 10})
        .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy: true})
        .isFloat({
            min: 1,
            max: 5
        })
        .withMessage("Stars must be an integer from 1 to 5"),

    handleValidationErrors,
];

/*------------------------------------------------------*/

// ADD IMAGE TO REVIEW
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    let reviewId = Number(req.params.reviewId)
    const userId = req.user.id
    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
    }})
    if(!review) return res.status(404).json({message: "Review couldn't be found"})
    const picCounter = await ReviewImage.count({
        where: {
            reviewId: reviewId,
        }
    })
    if(picCounter >= 10) return res.status(404).json({message: "Maximum number of images for this resource was reached"})

    const { url } = req.body
    let newPhoto;

    try{
        newPhoto = await ReviewImage.create({
            reviewId: reviewId,
            url: url
        })
        const addedPhoto = {
            id: newPhoto.id,
            url: newPhoto.url
        }
        res.status(200).json(addedPhoto)
    }
    catch(error){
        console.error("Error creating review image:", error);
        if (newPhoto) {
          await newPhoto.destroy();
        }
        res.status(500).json({ message: "Error creating Review image" });

    }
})

/*------------------------------------------------------*/

//EDIT A REVIEW
router.put('/:reviewId',validReview, requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
        }
    })
    if(!review)return res.status(404).json({message: "Review couldn't be found"});
    try{
        await review.update(req.body)

        const updated = await Review.findOne({
            where: {
                id: reviewId,
                userId: userId
            }
        })
        res.status(200).json(updated)
    }
    catch(error){
        res.status(500).json({"message": "could not update"})
    }

    console.log('this works')
})

/*------------------------------------------------------*/

// GET CURRENT USER REVIEWS
router.get('/current', requireAuth, async(req, res)=> {
    const findAllUserReviews = await Review.findAll({
        where: { userId: req.user.id},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model:Spot,
                as: "Spot",
                attributes: [
                    "id",
                    "ownerId",
                    "address",
                    "city",
                    "state",
                    "country",
                    "lat",
                    "lng",
                    "name",
                    "price",
                    "previewImage"
                ]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    })
   res.json(findAllUserReviews)
})

module.exports = router;
