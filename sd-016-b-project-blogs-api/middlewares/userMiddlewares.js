const isDisplayNameValid = (req, res, next) => {
   const { displayName } = req.body;

   if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
   }

   next();
};

 const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: '"email" is required' });

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+[a-z]{2,3}');

  const validate = emailRegex.test(email);

  if (!validate) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

   next();
 };

 const isPasswordValid = (req, res, next) => {
   const { password } = req.body;

   if (!password) return res.status(400).json({ message: '"password" is required' });
   if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
   }

   next();
 };

 module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
 };