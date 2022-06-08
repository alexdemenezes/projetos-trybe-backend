import { Request, Response } from 'express';
import orderModel from '../models/order.model';

const INTERNAL_ERROR_MESSAGE = { message: 'internal error!' };

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await orderModel();

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
};

export default getAll;