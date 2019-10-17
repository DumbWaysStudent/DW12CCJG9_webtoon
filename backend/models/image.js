'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    image: DataTypes.STRING,
    id_episode: DataTypes.INTEGER
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    image.belongsTo(models.episode, {

      as: 'episodeId',

      foreignKey: 'id_episode',

    });
  };
  return image;
};