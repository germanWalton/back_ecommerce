const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const args = require("./args/yargs");
const PORT = args.port;
const { server } = require('./server.js')



if (args.mode == 'cluster' && cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++){
    cluster.fork()
  }
  let endProcess = 0
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code}!!!`)
    endProcess += 1
    if (endProcess==numCPUs){process.exit()}
  })

}
else {
  server.listen(PORT, () =>
  console.log(`worker with pid ${process.pid} listening on https://localhost:${PORT}`)
  );
}