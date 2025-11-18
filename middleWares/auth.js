

const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send("Authorization header missing.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization failed.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send("Authorization failed.");
    }

    req.user = user; 
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send("Authorization header missing.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization failed.");
  }
  jwt.verify(token,  process.env.JWT_SECRET , (err, user) => {
    if (err) {
      return res.status(401).send("Authorization failed.");
    }
    req.user = user;
    if (user.role !== 'admin') {
      return res.status(403).send("Non Authorized Access.");
    }

    next();
  });
};

module.exports = {
  authenticateAdmin,
  authenticateToken
};
