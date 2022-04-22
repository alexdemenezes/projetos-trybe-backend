const isTitleValid = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const isContentValid = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const isCategoriesValid = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  if (categoryIds.length < 1) return res.status(400).json({ message: '"categoryIds" is required' });

  next();
};

const authorizedField = (req, res, next) => {
  const unauthorizedFields = [];
  const fields = Object.keys(req.body);
  console.log(fields);

  for (let i = 0; i <= fields.length; i += 1) {
    if (fields[i] === 'categoryIds') unauthorizedFields.push(1);
  }

  if (unauthorizedFields.length > 0) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  next();
};

module.exports = {
  isTitleValid,
  isContentValid,
  isCategoriesValid,
  authorizedField,
};