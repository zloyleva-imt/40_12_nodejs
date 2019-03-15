'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
	  return queryInterface.bulkInsert(
		  'Users',
		  [... new Array(10)].map(el => {
			  return {
				  name: faker.name.findName(),
				  email: faker.internet.email(),
				  password: '123456',
				  avatar: faker.image.imageUrl(),
				  createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				  updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
			  }
		  }),
		  {});
  },

  down: (queryInterface, Sequelize) => {
	  return queryInterface.bulkDelete('Users', null, {});
  }
};
