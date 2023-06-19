const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:spotImageId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const imageId = req.params.spotImageId;
    const image = await SpotImage.findOne({
        where: {
            id: imageId,
        }
    })
    if(!image)return res.status(404).json({"message": "Spot Image couldn't be found"})
    const spotId = image.spotId
    const ownerCheck = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: userId
        }
    })
    if(!ownerCheck)return res.status(403).json({"message": "Forbiden"})
    await image.destroy()
    res.status(200).json({"message": "Successfully deleted"})
})


module.exports = router;
