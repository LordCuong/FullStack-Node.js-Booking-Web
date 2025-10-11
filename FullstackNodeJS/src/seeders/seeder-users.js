'use strict';

    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // phonenumber: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // image: DataTypes.STRING,
    // roleId: DataTypes.STRING,
    // positionId: DataTypes.STRING,
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      email: 'Admin@gmail.com',
      password: 'admin@123',
      firstName: 'Le Hung Cuong',
      lastName: 'Z-TER',
      address:'VIET NAM',
      phoneNumber:'6969696969',
      gender:'1',
      image:'',
      roleId:'',
      positionId:'',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
