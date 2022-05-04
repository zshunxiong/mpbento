const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define("order", {
    expiredTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING,
    }
  });
  return Order;
};