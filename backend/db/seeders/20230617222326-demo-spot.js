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
        ownerId: 1,
        address: '100 brick st',
        city: 'brick',
        state: 'Tennessee',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'house',
        description: 'its a brick house',
        price: 123,
        previewImage: "https://preview.redd.it/snorp-snoop-v0-bb63qu22ah3b1.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=c870984632eb29b58960f4ac9b51af718d342f80",
      },
      {
        ownerId: 1,
        address: '100 gov st',
        city: 'gov',
        state: 'Maine',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'building',
        description: 'its a building',
        price: 456,
        previewImage: "https://preview.redd.it/just-a-cat-nothing-else-v0-uokilwd6k83b1.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=ce9990f7a4add5f6daa21f97cc1fe1b54fb8fd27",
      },
      {
        ownerId: 1,
        address: '100 turtle st',
        city: 'paris',
        state: 'Texas',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'shell',
        description: 'its a turtle shell',
        price: 999,
        previewImage: "https://preview.redd.it/aohedni24t2b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=869408e399e0a1cb4c4e415fbf32892e5e5f3ddd",
      },
      {
        ownerId: 2,
        address: '144 turtle st',
        city: 'hhill county',
        state: 'Texas',
        country:'USA',
        lat: 36.7645358,
        lng: -121.4730327,
        name: 'spot4',
        description: 'its the 4th spot',
        price: 999,
        previewImage: "https://preview.redd.it/aohedni24t2b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=869408e399e0a1cb4c4e415fbf32892e5e5f3ddd",
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
