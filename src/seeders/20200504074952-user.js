'use strict';
const faker = require("faker");
const bcrpt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var newData = [];

    for (let i = 0; i < 10; i++) {
      const seedData = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: bcrpt.hashSync("12345", 10),
      };
      newData.push(seedData);
    }
    
    return queryInterface.bulkInsert('Users', newData, {});
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
