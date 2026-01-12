'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            statusId: {
                type: Sequelize.STRING
            },

            doctorId: {
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            token:{
                type: Sequelize.STRING
            },
            files: {
                type: Sequelize.STRING
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addIndex(
            'Bookings',
            ['doctorId', 'date', 'timeType'],
            {
                unique: true,
                name: 'unique_doctor_date_time'
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Bookings');
    }
};