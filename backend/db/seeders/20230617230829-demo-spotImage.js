'use strict';
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url:"https://preview.redd.it/snorp-snoop-v0-bb63qu22ah3b1.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=c870984632eb29b58960f4ac9b51af718d342f80",
        preview: true,
      },
      {
        spotId: 2,
        url:"https://preview.redd.it/just-a-cat-nothing-else-v0-uokilwd6k83b1.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=ce9990f7a4add5f6daa21f97cc1fe1b54fb8fd27",
        preview: true,
      },
      {
        spotId: 3,
        url:"https://preview.redd.it/aohedni24t2b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=869408e399e0a1cb4c4e415fbf32892e5e5f3ddd",
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 1, 2, 3 ] }
    }, {});
  }
};
