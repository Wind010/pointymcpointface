const {SessionManager} = require('../models/sessionManager');
const {Session} = require('../models/session');
const {User} = require('../models/user');


/**
 * Creates a new planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.createSession = (req, res) => {
  if (req.body.id) {
    sessionId = req.body.id; // Unused right now.
  }

  const session = SessionManager.getInstance().createSession();
  // Save the session to a data store or memory
  res.status(200).json({ message: 'Session created successfully', sessionId: session.id });
};


/**
 * Joins a user to a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.joinSession = (req, res) => {
  const { sessionId } = req.params;  // Destructure just sessionId.

  // Create user

  const session = SessionManager.getInstance().getSessionById(sessionId);
  
  // Join user to session

  if (session) {
    res.status(200).json({ message: 'Joined session successfully', sessionId });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};


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


/**
 * Reveals estimates for a task within a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */exports.revealEstimates = (req, res) => {
  const { sessionId, storyId } = req.params;
 
  const session = SessionManager.getInstance().getSessionById(sessionId);

  if (session) {
    const estimates = session.revealEstimates();

    res.status(200).json({ message: 'Estimates revealed successfully', storyId, estimates });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
};
