const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where:{
            userId: userId
        },
        include: {
            model: Spot,
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
            "previewImage",

            ]
        }
    })
    res.status(200).json({Bookings: bookings})
})



module.exports = router;
