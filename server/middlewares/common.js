const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}