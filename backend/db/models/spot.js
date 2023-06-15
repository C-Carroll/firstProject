'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.SpotImage,
        { foreignKey: 'spotId' }
      )

      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isLat(val){
          if(!(isFinite(val)) && !(Math.abs(val) <= 90)) throw new Error ("Latitude is not valid")
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isLong(val){
          if(!(isFinite(val)) && !(Math.abs(val) <= 180)) throw new Error ("Longitude is not valid")
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.DECIMAL,

    },
    previewImage: {
      type: DataTypes.STRING,

    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
