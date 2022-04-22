const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const generateJwt = (username, password) => {
  const jwtConfig = {
    expiresIn: '20 min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { username, password } }, SECRET, jwtConfig);

  return token;
};

module.exports = generateJwt;
