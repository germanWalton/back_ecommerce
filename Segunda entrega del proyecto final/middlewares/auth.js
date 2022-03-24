const path = require('path')

const auth = (value, pathName) => {
  const isAdmin = value;
  return (req, res, next) => {
    if (isAdmin) {
      next();
    }
    else {
      res.status(401).send({Error:401, Description:` http://localhost:8080/api/${pathName}${req.path}`, Method:`${req.method} UNAUTHORIZED` })
}
  }
}

module.exports = auth;