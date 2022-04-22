const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
   const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';

   const [product] = await connection.execute(query, [id]);
   return product;
};

const create = async (name, quantity) => {
   const query = 'INSERT INTO products (name, quantity) VALUES (?, ?);';
     const [{ insertId }] = await connection.execute(query, [name, quantity]);
     return insertId;  
};

const update = async ({ id, name, quantity }) => {
  const query2 = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  const query1 = 'SELECT * FROM products WHERE id = ?';

  const [productExist] = await connection.execute(query1, [id]);

  if (productExist.length === 0) return false;

  await connection.execute(query2, [name, quantity, id]);
  
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query1 = 'SELECT * FROM products WHERE id = ?;';
  const query2 = 'DELETE FROM products WHERE id = ?;';

  const [productExist] = await connection.execute(query1, [id]);

  if (productExist.length === 0) return false;

  await connection.execute(query2, [id]);
  
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
