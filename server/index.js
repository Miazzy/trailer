const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')

    ; (async () => {
        await connect()
        initSchemas()
        await initAdmin()
        // require('./tasks/movie')
        // require('./tasks/api')
        // require('./tasks/trailer')
        // require('./tasks/qiniu')
    })()

const app = new Koa()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {})
})

app.listen(3000);