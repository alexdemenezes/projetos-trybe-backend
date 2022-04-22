const saleModel = require('../models/salesModel');

 const getAll = async () => {
  const sales = await saleModel.getAll();
  if (!sales) return { code: 500, response: null };

  return { code: 200, response: sales };
 };

 const getById = async (id) => {
    const sale = await saleModel.getById(id);

    if (!sale.length) return { code: 404, message: { message: 'Sale not found' } };

    return { code: 200, response: sale };
 };

 const createSale = async (sales) => {
   const { id } = await saleModel.createSaleDate();
 
   sales.forEach(async ({ productId, quantity }) => {
     await saleModel.createNewSale(
       id,
       productId,
       quantity,
     );
   });
 
   return { id, itemsSold: [...sales] };
 };

 const updateSale = async (id, sales) => {
   const searchId = await saleModel.getById(id);
   if (searchId.length === 0) return { code: 404, message: { message: 'Sale not found' } };
 
   sales.forEach(({ productId, quantity }) => {
      saleModel.updateSale(id, productId, quantity);
   });

   return { code: 200, response: { saleId: id, itemUpdated: [...sales] } };
 };

 module.exports = { 
   getAll,
   getById,
   createSale,
   updateSale,
  };