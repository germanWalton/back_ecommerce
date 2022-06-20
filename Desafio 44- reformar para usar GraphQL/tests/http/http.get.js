const http = require('http');

const options = {
  hostname:`localhost`,
  port:8080,
  path:'/api/products',
  method:'GET'
}


const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`)

  res.on('data', (data) => {
    process.stdout.write(data)
  })
})

req.on('error', (e) => console.log(e))

req.end()