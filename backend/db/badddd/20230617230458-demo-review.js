'use strict';
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 2,
        review:"badddddddddd. would give 0 stars if i could :(",
        stars:'1',
      },
      {
        userId: 2,
        spotId: 1,
        review:"loved it",
        stars:'5',
      },
      {
        userId: 3,
        spotId: 3,
        review:"meh",
        stars:'3',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [ 2, 1, 3 ] }
    }, {});
  }
};
