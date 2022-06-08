import { Request, Response } from 'express';
import productModel from '../models/products.model';

const INTERNAL_ERROR_MESSAGE = { message: 'internal error!' };

const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await productModel.getAll();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;
    const product = await productModel.create(name, amount);
    res.status(201).json(product);
  } catch (e) {
    return res.status(500).json(INTERNAL_ERROR_MESSAGE);
  }
};

export = {
  getAll,
  create,
};
