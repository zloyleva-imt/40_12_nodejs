'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
	  User.hasMany(models.CartItem);
  };
  return User;
};