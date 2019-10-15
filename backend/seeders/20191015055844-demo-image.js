'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [
      {
        image: 'https://via.placeholder.com/1080',
        id_episode: 1,
      },
      {
        image: 'https://via.placeholder.com/1080',
        id_episode: 2,
      },
      {
        image: 'https://via.placeholder.com/1080',
        id_episode: 3,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
