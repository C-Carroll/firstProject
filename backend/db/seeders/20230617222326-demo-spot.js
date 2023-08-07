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
        ownerId: 3,
        address: '1925 Walcott Way',
        city: 'Los Angeles',
        state: 'California',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'The Blue',
        description: 'Let me welcome you to my home with stunning views of Glendale. Everything you will need is right HERE!',
        price: 449,
        previewImage: "https://photos.zillowstatic.com/fp/35f22cf611595cfe78f01996dddf7c88-cc_ft_960.jpg",
      },
      {
        ownerId: 1,
        address: '202 W Campeche St',
        city: 'South Padre Island',
        state: 'Texas',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Beach House - 2min Walk to the Ocean',
        description: "Come stay at our beautiful home! We're just a 2 minutes of walking until you hit the beach. Whats not to love?",
        price: 360,
        previewImage: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f206836386r.jpg",
      },
      {
        ownerId: 1,
        address: '133 Prince st',
        city: 'Cleveland',
        state: 'Tennessee',
        country:'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'Stunning Farm House Getaway',
        description: 'Farm house located in the middle of rural Tennessee. Beautiful views and asthetic make this spot your #1 vacation destination',
        price: 489,
        previewImage: "https://photos.zillowstatic.com/fp/8f7c25d598a6229ec1720398abde0bc5-cc_ft_1536.webp",
      },
      {
        ownerId: 2,
        address: '144 turtle st',
        city: 'Catoosa',
        state: 'Oklahoma',
        country:'USA',
        lat: 36.7645358,
        lng: -121.4730327,
        name: 'Oklahoma Haven',
        description: 'Our home is bright and welcoming, all it needs is you. come stay at our home and relax for as long as you need!',
        price: 230,
        previewImage: "https://photos.zillowstatic.com/fp/2fc1d4e316bd8fd0bbe46afe933b5f6a-cc_ft_1536.webp",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      owenerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
