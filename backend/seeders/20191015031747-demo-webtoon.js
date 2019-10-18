'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('webtoons', [
    {
      title: "True Beauty",
      genre: 'Drama',
      image: 'https://via.placeholder.com/1020',
      favourite_count: 100,
      created_by: 1
    },
    {
      title: "Age Matters",
      genre: 'Romance',
      image: 'https://via.placeholder.com/1020',
      favourite_count: 100,
      created_by: 2
    },
    {
      title: "A Good Day to be a Dog",
      genre: 'Drama',
      image: 'https://via.placeholder.com/1020',
      favourite_count: 100,
      created_by: 3
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('webtoons', null, {});
  }
};
