import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import User from '../interfaces/user.interface';
import jwtGenerator from '../utils/jwtGenerator';

const createUser = async ({ username, classe, level, password }: User) => {
  const query = `INSERT INTO Trybesmith.Users 
  (username, classe, level, password) VALUES (?, ?, ?, ?)`;
  const [{ insertId }] = await 
  connection.execute<ResultSetHeader>(query, [username, classe, level, password]);

  if (insertId) {
    const token = jwtGenerator(username, password);
    return token;
  }
};

const getUserByUsername = async (username: string) => {
  const query = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
  const [user] = await connection.execute<RowDataPacket[]>(query, [username]);
  if (user.length > 0) return user;
  return null;
};

const loginUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (user && user[0].password === password) {
    const token = jwtGenerator(username, password);
    return { code: 200, token };
  }
  return { code: 401, message: { message: 'Username or password invalid' } };
};

export {
  createUser,
  loginUser,
};
