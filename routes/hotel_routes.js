const Router = require('koa-router')
const HotelService = require('../services/HotelService')

const router = new Router ()

router.param('id', HotelService.byId)

router.get('/hotels', HotelService.filter, HotelService.list)
router.get('/hotels/:id', HotelService.show)
router.post('/hotels', HotelService.create, HotelService.store)
router.put('/hotels/:id', HotelService.edit, HotelService.store)
router.del('/hotels/:id', HotelService.remove)

module.exports = router.routes()
