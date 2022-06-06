module.exports = {
  apps: [{
    name: 'Server 1',
    script: './src/app.js',
    args: '--port 8082'
  },{
    name: 'Server 2',
    script: './src/app.js',
    args: '--port 8083'
  },{
    name: 'Server 3',
    script: './src/app.js',
    args: '--port 8084'
  },{
    name: 'Server 4',
    script: './src/app.js',
    args: '--port 8085'
  }]
}