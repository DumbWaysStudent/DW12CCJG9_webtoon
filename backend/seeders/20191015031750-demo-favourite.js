'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('favourites', [
      {
        user_id: 1,
        webtoon_id: 1
      },
      {
        user_id: 1,
        webtoon_id: 1
      },
      {
        user_id: 1,
        webtoon_id: 2
      },
      {
        user_id: 1,
        webtoon_id: 2
      },
      {
        user_id: 1,
        webtoon_id: 3
      },
      {
        user_id: 1,
        webtoon_id: 3
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('favourites', null, {});
  }
};
