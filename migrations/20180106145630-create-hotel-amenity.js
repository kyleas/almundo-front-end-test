module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hotel_Amenity', {
      idHotel: {
        type: Sequelize.INTEGER,
        field: 'id_hotel',
        primaryKey: true,
        references: {
          model: 'Hotel',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      idAmenity: {
        type: Sequelize.INTEGER,
        field: 'id_amenity',
        primaryKey: true,
        references: {
          model: 'Amenity',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Hotel_Amenity')
  }
};
