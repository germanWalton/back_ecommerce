require('dotenv/config')
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const args = require("./args/yargs");
const PORT = process.env.PORT || 8080
const { server } = require('./server.js')
const logger = require('./log/index')


if (args.mode == 'cluster' && cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++){
    cluster.fork()
  }
  let endProcess = 0
  cluster.on("exit", (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died with code ${code}!!!`)
    endProcess += 1
    if (endProcess==numCPUs){process.exit()}
  })

}
else {
  server.listen(PORT, () =>
    logger.info(`worker with pid ${process.pid} listening on https://localhost:${PORT}`)
  
  );
}