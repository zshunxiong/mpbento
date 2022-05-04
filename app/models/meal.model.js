const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Meal = sequelize.define("meal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Meal;
};