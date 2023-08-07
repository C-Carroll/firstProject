"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/35f22cf611595cfe78f01996dddf7c88-cc_ft_960.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/be2583935654547e835fdf01512d2462-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.compass.com/m/fed66a845ac88b250ad527e5301b975bd5f5d2f4_img_12/origin.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.compass.com/m/fed66a845ac88b250ad527e5301b975bd5f5d2f4_img_2/origin.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.compass.com/m/fed66a845ac88b250ad527e5301b975bd5f5d2f4_img_8/origin.jpg",
          preview: false,
        },

        {
          spotId: 2,
          url: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f206836386r.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f2970927039r.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f2206045833r.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f4185106840r.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "http://lh.rdcpix.com/31096ab1153ee99c194d88b01d16d0a7l-f2801793005r.jpg",
          preview: false,
        },


        {
          spotId: 3,
          url: "https://photos.zillowstatic.com/fp/8f7c25d598a6229ec1720398abde0bc5-cc_ft_1536.webp",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://photos.zillowstatic.com/fp/f7409c2675b9dbe331e8a42f9fd38441-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://photos.zillowstatic.com/fp/a6593f20a7955f71c55a4e80827ebfba-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://photos.zillowstatic.com/fp/7fbc03da8f152b31ade518de45168ae0-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://photos.zillowstatic.com/fp/cd19d059c89d59374e5a4f04a5f68167-cc_ft_768.webp",
          preview: false,
        },


        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/2fc1d4e316bd8fd0bbe46afe933b5f6a-cc_ft_1536.webp",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/31fc945ddff54ec29394354da9e7b730-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/1f603968c8a79cc48004f1f06f4e20dd-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/718e06c571d2030cce09a7327695901e-cc_ft_768.webp",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/1f603968c8a79cc48004f1f06f4e20dd-cc_ft_768.webp",
          preview: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
