'use strict';

const faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Products',
			[... new Array(30)].map(el => {
				
				const views = faker.random.number({min:1,max:200});
				
				return {
					price: faker.commerce.price(),
					title: faker.commerce.productName(),
					description: faker.lorem.sentence(faker.random.number({min:15,max:30})),
					image: faker.random.image(),
					amount: faker.random.number({min:1,max:200}),
					views: views,
					orders: faker.random.number({min:1,max:views}),
					
					
					createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
				}
			}),
			{});
	},
	
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Products', null, {});
	}
};
