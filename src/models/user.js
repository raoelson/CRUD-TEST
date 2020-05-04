'use strict';
const bcrpt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,    
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false
  },
  {
    hooks : {
      beforeCreate: (user , options) => {
          {
            user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
          }
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};