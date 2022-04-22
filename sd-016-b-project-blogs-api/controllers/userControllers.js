const userServices = require('../services/userServices');

const create = async (req, res) => {
  const {
    displayName,
    email,
    password,
    image,

  } = req.body;

  const result = await userServices.create({
    displayName,
    email,
    password,
    image,
  });

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json({ token: result.token });
};

const getAll = async (_req, res) => {
 const result = await userServices.getAll();
 if (result.message) return res.status(result.code).json(result.message);

 return res.status(result.code).json(result.users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await userServices.getById(id);

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.user);
};

const deleteUser = async (req, res) => {
  console.log('chegou');
  const { data: { username } } = req.user;
  const userId = await userServices.getIdByName(username);
  
  const result = await userServices.deleteUser(userId);

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).end();
};

module.exports = { create, getAll, getById, deleteUser };