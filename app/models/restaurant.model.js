const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Restaurant = sequelize.define("restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
    },
  });
  return Restaurant;
};