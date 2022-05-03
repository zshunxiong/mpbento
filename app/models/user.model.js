const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  return User;
};