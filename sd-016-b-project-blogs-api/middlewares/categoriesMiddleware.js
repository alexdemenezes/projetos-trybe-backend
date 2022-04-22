 const isCategorieNameValid = (req, res, next) => {
   const { name } = req.body;

   console.log(req.user);

   if (!name) return res.status(400).json({ message: '"name" is required' });

   next();
 };

 module.exports = isCategorieNameValid;