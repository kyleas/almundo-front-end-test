module.exports = (sequelize, DataTypes) => {

  const Amenity = sequelize.define('Amenity', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{ tableName: 'Amenity', timestamps: false })

  Amenity.associate = (db) => {
    Amenity.associate = (db) => {
      Amenity.belongsToMany(db.Hotel, {
        as: 'hotels',
        through: 'Hotel_Amenity',
        foreignKey: 'idAmenity',
        otherKey: 'idHotel'
      })
    }
  }

  return Amenity
}
