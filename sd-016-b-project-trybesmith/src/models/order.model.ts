import { RowDataPacket } from 'mysql2';
import connection from './connection';

// import Order from '../interfaces/order.interface';

// referencia para lógica https://github.com/tryber/sd-016-b-project-trybesmith/pull/1/commits/651427194fc6e1ad1096b8c4bfe3b5d04ceed8b0

const getAllOrders = async () => {
  const query1 = 'SELECT * FROM Trybesmith.Orders ;';
  const query2 = 'SELECT * FROM Trybesmith.Products';

  const [products] = await connection.execute<RowDataPacket[]>(query2);

  const [orders] = await connection.execute<RowDataPacket[]>(query1);

  const response = orders.map((order) => ({
    ...order, 
    productsIds: products.filter((product) => 
      product.orderId === order.id).map((product) => product.id) }));

  return response;
};

export default getAllOrders;
