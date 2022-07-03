import Router from 'koa-router'
import products from '../data/products.js'

const router = new Router({
  prefix: '/api/products'
})


router.get('/', (ctx) => ctx.body = products)

router.get("/:id", (ctx) => {
  const { id } = ctx.params
  const product = products.find((el) => el.id === id)

  if(!product) {
    ctx.response.status = 404
  } else {
    ctx.body = product
  }
})

router.post("/", (ctx) => {

  const prod = ctx.request.body
  console.log(prod)
  products.push(prod)

  ctx.body = "OK"

})

router.delete("/:id", (ctx) => {

  const { id } = ctx.params

  if (!id) {
      ctx.body = "Id does not exist"
      return
  }

  const prod = products.find((p) => p.id === id)

  if (!prod) {
      ctx.response.status = 404
      ctx.body = "Product does not exist"
      return
  }

  products = products.filter((p) => p.id !== id)

  ctx.body = `Product with id ${id} deleted`

})

export default router