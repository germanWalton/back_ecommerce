import Koa from 'koa'
import body from 'koa-body'
import products from './routes/products.js'


const app = new Koa()

app.use(body())


app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
})

app.use(products.routes())
// app.use(async (ctx) => {
//   console.log('ruta principal')
//   ctx.body = 'Hello World'
// })

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))
server.on('error', (err) => console.log(err))