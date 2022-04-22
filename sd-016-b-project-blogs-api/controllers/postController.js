const postServices = require('../services/postServices');
const userServices = require('../services/userServices');

const create = async (req, res) => {
  const { data: { username } } = req.user;
  const { title, content, categoryIds } = req.body;

  const userId = await userServices.getIdByName(username);

  if (userId) {
    const result = await postServices.create({ title, content, categoryIds, userId });
    if (result.message) return res.status(result.code).json(result.message);

    return res.status(result.code).json(result.post);
  }
};

const getAll = async (req, res) => {
  const result = await postServices.getAll();
  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.posts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await postServices.getById(id);

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { data: { username } } = req.user;

  const userId = await userServices.getIdByName(username);

  const getPost = await postServices.getById(id);

  if (getPost.post.userId === userId) {
    const result = await postServices.update({ id, title, content });
    if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.post);
  }

  return res.status(401).json({ message: 'Unauthorized user' });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { data: { username } } = req.user;
  const userId = await userServices.getIdByName(username);
  const getPost = await postServices.getById(id);

  if (getPost.code === 404) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (getPost.post.userId === userId) {
    const result = await postServices.deletePost(id);

    if (result.message) return res.status(result.code).json(result.message);

    return res.status(result.code).end();
  }

  return res.status(401).json({ message: 'Unauthorized user' });
};

const getByTerm = async (req, res) => {
  const { q } = req.query;

  console.log('cheguei');

  const result = await postServices.getByTerm(q);
  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.posts);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  getByTerm,
};