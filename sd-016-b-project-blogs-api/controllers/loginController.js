const userServices = require('../services/userServices');

const login = async (req, res) => {
  const { password, email } = req.body;
  
const result = await userServices.login(email, password);

if (result.message) return res.status(result.code).json(result.message);

return res.status(result.code).json({ token: result.token });
};

module.exports = { login };