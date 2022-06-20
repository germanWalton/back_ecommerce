const http = require('http');
const createProduct = require('../util')

console.log(createProduct())
const data = JSON.stringify(createProduct());
console.log(data)

const options = {
  hostname:`localhost`,
  port:8080,
  path:'/api/products',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'content-length': data.length
  }
}


const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`)

  res.on('data', (data) => {
    process.stdout.write(data)
  })
})

req.on('error', (e) => console.log(e))

req.write(data)

req.end()