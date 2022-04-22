 const productModel = require('../models/productModel');

 const getAll = async () => {
  const products = await productModel.getAll();
  if (!products) return { code: 500, response: null };

  return { code: 200, response: products };
 };

 const getById = async (id) => {
    const product = await productModel.getById(id);

    if (!product.length) return { code: 404, message: { message: 'Product not found' } };

    return { code: 200, response: product[0] };
 };

 const create = async (name, quantity) => {
   const allProducts = await productModel.getAll();
  const productExists = allProducts.find((product) => product.name === name);

  if (productExists) return { code: 409, message: { message: 'Product already exists' } };

  const product = await productModel.create(name, quantity);

   return { code: 201, insertId: product };
 };

 const update = async (payload) => {
    const product = await productModel.update(payload);
    if (!product) return { code: 404, message: { message: 'Product not found' } };
    return { 
       code: 200, 
       product, 
      };
 };

 const deleteProduct = async (id) => {
    const product = await productModel.deleteProduct(id);

    if (!product) return { code: 404, message: { message: 'Product not found' } };
    return {
       code: 204,
    };
 };

 module.exports = { 
   getAll,
   getById,
   create,
   update,
   deleteProduct,
  };