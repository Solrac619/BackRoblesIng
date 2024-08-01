const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/configsecret');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;
