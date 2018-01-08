module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hotel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stars: {
        type: Sequelize.SMALLINT,
        default: 3
      },
      price: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Hotel');
  }
}
