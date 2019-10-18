'use strict';
module.exports = (sequelize, DataTypes) => {
  const webtoon = sequelize.define('webtoon', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    favourite_count: DataTypes.INTEGER,
    image: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {});
  webtoon.associate = function(models) {
    // associations can be defined here
    webtoon.belongsTo(models.user, {

      as: 'createdBy',

      foreignKey: 'created_by',

    })
  };
  return webtoon;
};