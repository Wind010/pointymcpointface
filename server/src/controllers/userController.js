const SessionManager = require('../models/sessionManager');
const Session = require('../models/session');
const User = require('../models/user');


/**
 * Create User method.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createUser = (req, res) => {
  const { name } = req.body;

  try {
    const createdUser = new User(name);
    res.status(201).json({ user: createdUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Estimates a story/item within a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.estimate = (req, res) => {
  const { sessionId, storyId, userId } = req.params;
  const { estimate } = req.body;
  
  const session = SessionManager.getInstance().getSessionById(sessionId);

  if (session) {
    session.

    res.status(200).json({ message: 'Story estimated successfully', storyId, estimate });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};


