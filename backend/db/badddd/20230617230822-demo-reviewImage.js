'use strict';
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://preview.redd.it/error-404-rizz-not-found-v0-ui9ra8b1t15b1.png?auto=webp&v=enabled&s=30dfee1a19db8a9ec4379f5a7536431da41be0c9",
      },
      {
        reviewId: 1,
        url: "https://preview.redd.it/61srjybjzd6b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=1123f6c070e803acf85cb418876c721eab4424ec",
      },
      {
        reviewId: 2,
        url: "https://preview.redd.it/thoroughly-bamboozled-v0-m7idipca346b1.jpg?auto=webp&v=enabled&s=e5b34731a3af7181436536f9aec2e1a41de3f5c5",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 1, 1, 3 ] }
    }, {});
  }
};
