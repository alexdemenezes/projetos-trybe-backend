const CategoriesService = require('../services/categoriesServices');

const create = async (req, res) => {
  const { name } = req.body;

  const result = await CategoriesService.create({ name });

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.newCategorie);
};

const getAll = async (req, res) => {
  console.log(req.user);
  const result = await CategoriesService.getAll();

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.categories);
};

module.exports = {
  create,
  getAll,
};