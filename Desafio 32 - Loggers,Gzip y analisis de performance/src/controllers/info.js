const args = require('../args/yargs')
const numCPUs = require("os").cpus().length;
const logger = require("../log/index")

const info = (req, res) => {
  try {
    const info = {
      args: JSON.stringify(args, null, 2),
      execPath: process.execPath,
      platform: process.platform,
      pid: process.pid,
      version: process.version,
      projectPath: process.cwd(),
      rss: JSON.stringify(process.memoryUsage(), null, 2),
      cpus:numCPUs
    };
    if (req.query.console) {
      logger.log(JSON.stringify(info,null,2))
    }
    res.render('info',{ layout: 'login',info })

  } catch(e){console.log(e)}
};

module.exports = {info}