'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 1,
        created_by: 1
      },
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 2,
        created_by: 2
      },
      {
        title: 'Episode 1',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3
      },
      {
        title: 'Episode 2',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3
      },
      {
        title: 'Episode 3',
        image: 'https://via.placeholder.com/1020',
        webtoon_id: 3,
        created_by: 3
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  }
};
