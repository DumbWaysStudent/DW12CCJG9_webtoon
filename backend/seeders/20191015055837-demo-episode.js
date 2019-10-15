'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: 'Episode 1',
        webtoon_id: 1
      },
      {
        title: 'Episode 2',
        webtoon_id: 1
      },
      {
        title: 'Episode 3',
        webtoon_id: 1
      },
      {
        title: 'Episode 1',
        webtoon_id: 2
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  }
};
