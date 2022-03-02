
const auth = (value, pathName) => {
  const isAdmin = value;
  return (req, res, next) => {
    if (isAdmin) {
      next();
    }
    else {
      res.status(401).send({error:401, description: "unauthorized route"})
}
  }
}

module.exports = auth;