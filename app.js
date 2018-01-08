const logger = require('koa-logger')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const serve = require('koa-static')
const path = require('path')
const render = require('koa-ejs')

const db = require('./models')
const router = require('./routes')

const Koa = require('koa')

const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/./config/config.json')[env]

const app = module.exports = new Koa()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false
})

app.use(cors())

app.use(logger())

app.use(koaBody())

app.use(db)
app.use(router.routes())

app.use(serve(__dirname + '/public'))

console.log(`SERVER LISTENING ON PORT ${config.server_port}`)
app.listen(config.server_port)
