'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    page: DataTypes.INTEGER,
    image: DataTypes.STRING,
    webtoon_id: DataTypes.INTEGER,
    id_episode: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    image.belongsTo(models.episode, {

      as: 'episodeId',

      foreignKey: 'id_episode',

    });

    image.belongsTo(models.user, {

      as: 'createdBy',

      foreignKey: 'created_by',

    });
  };
  return image;
};