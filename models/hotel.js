const yup = require('yup')

module.exports = (sequelize, DataTypes) => {

  const Hotel = sequelize.define('Hotel', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.SMALLINT,
      default: 3
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{ tableName: 'Hotel' })

  Hotel.YupSchema = yup.object().shape({
    name: yup.string().required(),
    stars: yup.number().min(1).max(5).required(),
    price: yup.number().positive().required(),
    image: yup.string().url(),
    amenities: yup.array().of(yup.string())
  })

  Hotel.validateSchema = async (obj, abortEarly = false) => await Hotel.YupSchema.validate(obj, { abortEarly })

  Hotel.associate = (db) => {
    Hotel.belongsToMany(db.Amenity, {
      as: 'amenities',
      through: 'Hotel_Amenity',
      foreignKey: 'idHotel',
      otherKey: 'idAmenity'
    })
  }

  Hotel.saveWithAmenities = async (hotel, amenities, db) => {
    return await db.sequelize.transaction(async (t) => {
      return await Promise.all(amenities.map(amenity => db.Amenity.findOrCreate({ where: { name: amenity}, transaction: t, defaults: { id: null } })))
        .then(async amenities => {
          console.log('HEY');
          console.log(JSON.stringify(amenities));
          return await hotel.save({transaction: t })
            .then(async hotel => {
              return await db.Hotel_Amenity.destroy({ transaction: t, where: { idHotel: hotel.id }})
                .then(async () => {
                  let ha = amenities.map(amenity => { return { idAmenity: amenity[0].get().id, idHotel: hotel.id }})
                  return await db.Hotel_Amenity.bulkCreate(ha, {transaction: t })
                    .then(() => {
                      hotel.set('amenities', amenities.map(amenity => amenity[0].get()))
                      return hotel
                    })
                })
            })
        })
    })
  }

  return Hotel
}
