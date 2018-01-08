module.exports = {

  async byId (id, ctx, next) {
    if (!id) {
      ctx.throw(404)
    }

    let hotel = null;

    try {
      hotel = await ctx.app.db.Hotel.findById(id, { include: ['amenities'] })
      if (!hotel) throw new Error('Resource not found')
    } catch (err) {
      ctx.throw(404)
    }

    ctx.params.hotel = hotel

    await next()
  },

  async show (ctx) {
    const hotel = ctx.params.hotel.get()
    ctx.body = { hotel: hotel }
  },

  async filter(ctx, next) {
    const Op = ctx.app.db.Sequelize.Op
    const params = ctx.request.query

    let where = {}
    let limit, offset

    if (params.query) {
      where.name = {
        [Op.like]: `%${params.query}%`
      }
    }
    if (params.stars) {
      let stars = params.stars.split(',')
        .map(Number)
        .filter(star => !isNaN(star))

      where.stars = {
        [Op.in]: stars
      }
    }
    limit = (params.limit && !isNaN(params.limit))? params.limit:null
    offset = (params.offset && !isNaN(params.offset))? params.offset:null

    ctx.params.where = where
    ctx.params.limit = limit
    ctx.params.offset = offset

    await next()
  },

  async list (ctx) {
    const hotels = await ctx.app.db.Hotel.findAll({
      where: ctx.params.where,
      limit: ctx.params.limit,
      offset: ctx.params.offset,
      include: ['amenities']
    })

    const total = await ctx.app.db.Hotel.count({ where: ctx.params.where })

    ctx.body = { hotels, total, count: hotels.length }
  },

  async create (ctx, next) {
    try {
      const newHotel = await ctx.app.db.Hotel.validateSchema(ctx.request.body)
      ctx.params.hotel = ctx.app.db.Hotel.build(newHotel)
      ctx.params.amenities = ctx.request.body.amenities
    } catch (err) {
      ctx.throw(400, err)
    }

    await next()
  },

  async edit (ctx, next) {
    try {
      const newHotel = await ctx.app.db.Hotel.validateSchema(ctx.request.body)
      ctx.params.hotel.set(newHotel)
      ctx.params.amenities = ctx.request.body.amenities
    } catch (err) {
      ctx.throw(400, err)
    }

    await next()
  },

  async remove (ctx) {
    const response = {}

    try {
      await ctx.params.hotel
        .destroy()
      response.status = 'OK'
    } catch (err) {
      throw err
    }

    ctx.body = response
  },

  async store(ctx) {
    let hotel = await ctx.app.db.Hotel.saveWithAmenities(ctx.params.hotel, ctx.params.amenities, ctx.app.db)
    hotel = hotel.get()
    hotel.amenities = hotel.amenities.map(amenity => amenity.name)
    ctx.body =  hotel
  }

}
