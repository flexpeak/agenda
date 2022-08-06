'use strict';
const { User } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash('123', salt)

    await User.create({
      email: 'admin@admin.com',
      password: hash
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
