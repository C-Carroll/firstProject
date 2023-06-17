'use strict';
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        ownerId: 1,
        address: '100 brick st',
        city: 'brick',
        state: 'Tennessee',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'house',
        description: 'its a brick house',
        price: 123
      },
      {
        id: 2,
        ownerId: 1,
        address: '100 gov st',
        city: 'gov',
        state: 'Maine',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'building',
        description: 'its a building',
        price: 456
      },
      {
        id: 3,
        ownerId: 1,
        address: '100 turtle st',
        city: 'paris',
        state: 'Texas',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'shell',
        description: 'its a turtle shell',
        price: 999
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['brick', 'gov', 'paris'] }
    }, {});
  }
};
