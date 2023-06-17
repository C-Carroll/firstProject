const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:reviewImageId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const imageId = req.params.reviewImageId;
    const image = await ReviewImage.findOne({
        where: {
            id: imageId,
        }
    })
    if(!image)return res.status(404).json({"message": "Review Image couldn't be found"})
    const reviewId = image.reviewId;
    const reviewCheck = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
        }
    })
    if(!reviewCheck)return res.status(404).json({"message": "Forbiden"})
    await image.destroy()
    res.status(200).json({"message": "Successfully deleted"})
})



module.exports = router;
