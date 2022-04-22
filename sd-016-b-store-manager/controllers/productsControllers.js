const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();

  return res.status(products.code).json(products.response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);

  if (!product.response) return res.status(product.code).json(product.message);

  return res.status(product.code).json(product.response);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsServices.create(name, quantity);
   if (product.code === 409) return res.status(product.code).json(product.message);

   return res.status(product.code).json({ id: product, name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const response = await productsServices.update({ id, ...req.body });
  if (!response.product) return res.status(response.code).json(response.message);

  return res.status(response.code).json(response.product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await productsServices.deleteProduct(id);
  if (response.message) return res.status(response.code).json(response.message);

  return res.status(response.code).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};