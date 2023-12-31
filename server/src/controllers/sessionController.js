const SessionManager = require('../models/sessionManager');
const {Session} = require('../models/session');
const UserManager = require('../models/userManager');
const User = require('../models/user');


/**
 * Creates a new planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createSession = async (req, res) => {
  let id;
  if (req.body.id) {
    id = req.body.id; // Unused right now.
  }

  id = null; // Empty it out for now.
  
  const userId = req.body.userId;
  const user = UserManager.getInstance().getUserById(userId);

  const { name, description } = req.body;
  const session = SessionManager.getInstance().createSession(name, user, id);
  // Save the session to a data store or memory
  res.status(201).json({ message: 'Session created successfully', id: session.id });
};


/**
 * Joins a user to a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.joinSession = (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  
  const user = UserManager.getInstance().getUserById(userId);
  
  if (! user) {
    res.status(404).json({message: 'User not found' });
  }

  const session = SessionManager.getInstance().getSessionById(id);

  if (session) {
    session.addUser(user);
    res.status(200).json({ message: `${user.name} joined session successfully`, id });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};



/**
 * Estimates a story/item within a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.estimate = (req, res) => {
  const id = req.params.id;
  const { userId, estimate } = req.body;
  
  const user = UserManager.getInstance().getUserById(userId);
  if (! user) {
    res.status(404).json({message: 'User not found' });
  }

  const session = SessionManager.getInstance().getSessionById(id);
  
  if (session) {
    user.setEstimate(estimate);
    res.status(200).json({ message: 'Story estimated successfully' });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};



/**
 * Reveals estimates for a task within a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.revealEstimates = (req, res) => {
  const { sessionId, storyId } = req.params;
 
  const session = SessionManager.getInstance().getSessionById(sessionId);

  if (session) {
    const estimates = session.revealEstimates();

    res.status(200).json({ message: 'Estimates revealed successfully', storyId, estimates });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};
