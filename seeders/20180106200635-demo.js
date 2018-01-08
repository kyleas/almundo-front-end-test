const mockData = require('./data.json')
const env = process.env.NODE_ENV || 'development'

const config = require('../config/config.json')[env]
let serverUrl = config.server_name
serverUrl += (config.server_port != 80)? (':' + config.server_port):''

module.exports = {
  up: (queryInterface, Sequelize) => {
    let distinct_amenities = []
    let amenities = []
    let hotel_amenities = []
    let hotels = mockData.map(hotel => {
      hotel.image = `${serverUrl}/images/hotels/${hotel.image}`
      hotel.amenities.forEach(amenity => {
        if (!distinct_amenities.includes(amenity)) {
          distinct_amenities.push(amenity)
          amenities.push({ id: distinct_amenities.length, name: amenity })
          hotel_amenities.push({ id_hotel: Number(hotel.id), id_amenity: distinct_amenities.length })
        } else {
          for (var i = 0; i < distinct_amenities.length; i++) {
            if (distinct_amenities[i] == amenity) {
              hotel_amenities.push({ id_hotel: Number(hotel.id), id_amenity: i + 1 })
              break
            }
          }
        }
      })
      delete hotel.amenities
      return hotel
    })

    var found = false
    for (var i = 0; i < hotel_amenities.length; i++) {
      var ha = hotel_amenities[i]
      found = false
      for (var j = 0; j < hotels.length; j++) {
        var hotel = hotels[j]
        if (hotel.id == ha.id_hotel) {
          found = true
          break
        }
      }
      if (!found) {
        console.log("OOPS")
        break
      }
    }

    return queryInterface.bulkInsert('Hotel', hotels)
      .then(async () => {
        await queryInterface.bulkInsert('Amenity', amenities)
          .then(async () => {
            await queryInterface.bulkInsert('Hotel_Amenity', hotel_amenities)
          })
      })

  }
}
