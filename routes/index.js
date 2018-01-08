const Router = require('koa-router')
const hotels = require('./hotel_routes')

const router = new Router()
const api = new Router()

api.use(hotels)

router.use('/api', api.routes())

router.get('/', async function (ctx) {
  await ctx.render('home')
})

module.exports = router
