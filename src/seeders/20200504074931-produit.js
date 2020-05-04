'use strict';
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    
    */
   var newData = [];

   for (let i = 0; i < 10; i++) {
       const seedData = {
          nom: faker.commerce.productName(),
          description: faker.lorem.word(),
          prix: faker.commerce.price(),
          createdAt: new Date()
        };
      newData.push(seedData);
   }
    return queryInterface.bulkInsert('Produits', 
    newData, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
