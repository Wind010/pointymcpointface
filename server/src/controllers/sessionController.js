const SessionManager = require('../models/sessionManager');
const {Session} = require('../models/session');
const {User} = require('../models/user');


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

  const { name, description } = req.body;
  const session = SessionManager.getInstance().createSession(name, id);
  // Save the session to a data store or memory
  res.status(201).json({ message: 'Session created successfully', id: session.id });
};


/**
 * Joins a user to a planning poker session.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.joinSession = (req, res) => {
  const { sessionId } = req.params;  // Destructure just sessionId.
  
  let user;
  try {
    user = JSON.parse(req.body);
  } catch (error) {
    // Handle the parsing error gracefully
    console.error('Error parsing JSON:', error);
    // Optionally, you might send an error response to the client or handle it accordingly
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  
  const session = SessionManager.getInstance().getSessionById(sessionId);


  if (session) {
    session.addUser(user);
    res.status(200).json({ message: `${User.name} joined session successfully`, sessionId });
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

