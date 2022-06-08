import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const SECRET = 'gfjkfghfg' as Secret;

const generateJwt = (username: string, password: string) => {
  const jwtConfig: SignOptions = {
    expiresIn: '20 min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { username, password } }, SECRET, jwtConfig);
  return token;
};

export default generateJwt;
