const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();


//GET CURRENT USRS BOOKINGS
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

/*------------------------------------------------------*/

//EDIT BOOKING
router.put('/:bookingId', requireAuth, async(req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id
    const booking = await Booking.findByPk(bookingId);

    if(!booking) return res.status(404).json({message: 'No booking found'})

    if(booking.userId !== userId)return res.status(403).json({message: 'forbiden'})

    const {startDate, endDate} = req.body
    let start = Date.parse(startDate)
    let end = Date.parse(endDate)
    let origEndDate = booking.endDate
    let origDateParse = Date.parse(origEndDate)
    let today = new Date()
    let todayParsed = Date.parse(today)
    if (origDateParse < todayParsed) return res.status(403).json({message: "Past bookings can't be modified"})
    if(start >= end) return res.status(400).json({"message": "Bad Request",
    "errors": {
      "endDate": "endDate cannot be on or before startDate"
    }})
    const existingBooking = await Booking.findOne({
        where: {
          spotId: booking.spotId,
          startDate: {
            [Op.lt]: endDate,
          },
          endDate: {
            [Op.gt]: startDate,
          },
        },
    });
    if (existingBooking){
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
    }

    const update = await booking.update(req.body)
    res.status(200).json(update)

})

/*------------------------------------------------------*/

//DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findOne({
        where: {
            id: bookingId,
            userId: userId
        }
    })
    if(!booking)return res.status(404).json({"message": "Review couldn't be found"});
    await booking.destroy()
    res.status(200).json({"message": "Successfully deleted"})


})




module.exports = router;
