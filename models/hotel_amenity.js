module.exports = (sequelize, DataTypes) => {

  const hotel_amenity = sequelize.define('Hotel_Amenity', {
    idHotel: {
      type: DataTypes.INTEGER,
      field: 'id_hotel',
      references: {
        model: 'Hotel',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    idAmenity: {
      type: DataTypes.INTEGER,
      field: 'id_amenity',
      references: {
        model: 'Amenity',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  },{ tableName: 'Hotel_Amenity', timestamps: false })

  return hotel_amenity
}
