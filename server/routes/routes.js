const express = require('express');
const router = express.Router();
const planningPokerController = require('../server/controllers/planningPokerController');

// Route to create a new planning poker session
router.post('/createSession', planningPokerController.createSession);

// Route to join a session
router.post('/joinSession/:sessionId', planningPokerController.joinSession);

// Route to estimate a task
router.post('/estimate/:sessionId/:taskId', planningPokerController.estimateTask);

// Route to reveal task estimates
router.get('/revealEstimates/:sessionId/:taskId', planningPokerController.revealEstimates);

module.exports = router;
