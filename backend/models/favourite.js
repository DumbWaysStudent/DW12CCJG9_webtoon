'use strict';
module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('favourite', {
    user_id: DataTypes.INTEGER,
    webtoon_id: DataTypes.INTEGER
  }, {});
  favourite.associate = function(models) {
    // associations can be defined here
    favourite.belongsTo(models.user, {

      as: 'userId',

      foreignKey: 'user_id',

    });

    favourite.belongsTo(models.webtoon, {

      as: 'webtoonId',

      foreignKey: 'webtoon_id',

    });
  };
  return favourite;
};