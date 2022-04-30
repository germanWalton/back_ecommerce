const yargs = require('yargs')(process.argv.slice(2))

const args = yargs.default({
  port: 8080,
  mode:'fork'
}).argv

module.exports =  args 