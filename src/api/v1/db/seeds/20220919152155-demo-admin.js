'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                username: 'admin',
                password: '$2a$12$TFaw6o96a8Je3kVL71d5p.fgCOcZd7wG29te4b7h/JlUJr5o9v/iu',
                role: 'admin',
                createdAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
}
