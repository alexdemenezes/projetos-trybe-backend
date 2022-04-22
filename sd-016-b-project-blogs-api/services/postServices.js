const { BlogPosts, PostsCategories, Categories, User, Sequelize } = require('../models');

const { or, like } = Sequelize.Op;

const internalError = { code: 500, message: { message: 'internal error' } };

const create = async ({ title, content, userId, categoryIds }) => {
  const postInfo = { title, content, userId };

  try {
    const newPost = await BlogPosts.create({ ...postInfo });
    const promises = categoryIds.map((id) => Categories.findByPk(id));

    const result = await Promise.all(promises);

    const invalidCategory = await result.filter((r) => r === null);

    if (invalidCategory.length >= 1) {
      return { code: 400, message: { message: '"categoryIds" not found' } };
    }

    const postId = newPost.id;

    const p = categoryIds.map((categoryId) => PostsCategories.create({ postId, categoryId }));

    await Promise.all(p);
    return { code: 201, post: { id: postId, userId, title, content } };
  } catch (e) {
    return internalError;
  }
};

const getAll = async () => {
  try {
    const posts = await BlogPosts.findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });

    return { code: 200, posts };
  } catch (e) {
    return internalError;
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPosts.findOne({
      where: {
        id,
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
      
    if (!post) return { code: 404, message: { message: 'Post does not exist' } };
    
    return { code: 200, post };
  } catch (e) {
    return internalError;
  }
};

const update = async (payload) => {
  const { title, content, id } = payload;

  try {
    const postUpdated = await BlogPosts.update({ title, content }, { where: { id } });

    if (!postUpdated) return { code: 404, message: { message: 'post not found' } };

    const updatedPost = await BlogPosts.findOne({
      where: { id },
      include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
    });

    return { code: 200, post: updatedPost };
  } catch (e) {
    return internalError;
  }
};

const deletePost = async (id) => {
  try {
    await PostsCategories.destroy({ where: { postId: id } });
    await BlogPosts.destroy({ where: { id } });

    console.log(id);

    return { code: 204 };
  } catch (e) {
    console.log(e);
    return internalError;
  }
};

// referencia para a lógica tirada do código do colega Gabriel silvestre junto a documentação
// link do repositório dele: https://github.com/tryber/sd-016-b-project-blogs-api/pull/5/commits/b6d32e4f13c9026e39a72297e8fdc0b8ab4967b0
// link da documentação: https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAll

const getByTerm = async (term) => {
  try {
    const posts = await BlogPosts.findAll({
      where: {
        [or]: [
          { title: { [like]: `%${term}%` } },
          { content: { [like]: `%${term}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });

    // console.log(posts);

    return { code: 200, posts };
  } catch (e) {
    return internalError;
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  getByTerm,
};
