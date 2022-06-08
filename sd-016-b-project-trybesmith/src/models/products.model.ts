import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import Product from '../interfaces/product.interface';

const getAll = async (): Promise<Product[]> => {
  const query = 'SELECT * FROM Trybesmith.Products;';

  const [result] = await connection.execute<RowDataPacket[]>(query);

  return result as Product[];
};

const create = async (name: string, amount: string) => {
  const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
  const [{ insertId }] = await connection.execute<ResultSetHeader>(query, [name, amount]);

  if (insertId) {
    return {
      id: insertId,
      name,
      amount,
    };
  }
};

const getProductsByOrderId = async (orderId: number) => {
  const query = 'SELECT * FROM Trybesmith.Products WHERE orderId=?';
  const [result] = await connection.execute(query, [orderId]);
  return result;
};

export = {
  getAll,
  create,
  getProductsByOrderId,
};
