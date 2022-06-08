import { Response, Request } from 'express';
import { createUser, loginUser } from '../models/user.model';

const INTERNAL_ERROR_MESSAGE = { message: 'internal error!' };

const create = async (req: Request, res: Response) => {
  try {
    const { username, classe, level, password } = req.body;
    const token = await createUser({ username, classe, level, password });
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    if (result.message) return res.status(result.code).json(result.message);
    return res.status(result.code).json({ token: result.token });
  } catch (e) {
    return { code: 401, message: { message: 'Username or password invalid' } };
  }
};

export {
  create,
  login,
};