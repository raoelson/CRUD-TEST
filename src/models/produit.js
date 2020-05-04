'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    prix: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
    }
  },{
    timestamps: false
  },{});
  Produit.associate = function(models) {
    // associations can be defined here
  };
  return Produit;
};