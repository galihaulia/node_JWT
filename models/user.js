'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    developer_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};