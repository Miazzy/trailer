const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
})

app.listen(3000);