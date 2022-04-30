module.exports = {
  apps:[{
    name: "Server Cluster",
    script: "./src/app.js",
    args: "--port 8081",
    instances: "max",
    exec_mode:"cluster"
  }]}