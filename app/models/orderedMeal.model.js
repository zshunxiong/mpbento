const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderedMeal = sequelize.define("orderedMeal", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING,
    }
  });
  return OrderedMeal;
};