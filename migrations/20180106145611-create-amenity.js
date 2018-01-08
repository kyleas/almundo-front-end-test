module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Amenity', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Amenity');
  }
}
