const salesServices = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  return res.status(sales.code).json(sales.response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getById(id);

  if (!sale.response) return res.status(sale.code).json(sale.message);

  return res.status(sale.code).json(sale.response);
};

const create = async (req, res) => {
    const sales = req.body;
    const sale = await salesServices.createSale(sales);
    return res.status(201).json(sale); 
};

const updateSale = async (req, res) => {
   const { id } = req.params;
   const sales = req.body;
   const sale = await salesServices.updateSale(id, sales);
   console.log(sale);
   if (sale.code === 404) return res.status(sale.code).json(sale.message);

   return res.status(sale.code).json(sale.response);
};

module.exports = {
  getAll,
  getById,
  create,
  updateSale,
};