const SessionManager = require('../models/sessionManager');
const UserManager = require('../models/userManager');
const User = require('../models/user');



/**
 * Create User method.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  try {
    const createdUser = UserManager.getInstance().createUser(name, email);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
