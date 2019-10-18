'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define('episode', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    webtoon_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {});
  episode.associate = function(models) {
    // associations can be defined here
    episode.belongsTo(models.webtoon, {

      as: 'webtoonId',

      foreignKey: 'webtoon_id',

    });

    episode.belongsTo(models.user, {

      as: 'createdBy',

      foreignKey: 'created_by',

    });
  };
  return episode;
};