const express = require('express');
const router = express.Router();
const planningPokerController = require('../controllers/planningPokerController');

// Route to create a new planning poker session
router.post('/session', (req, res) => {planningPokerController.createSession});

// Route to join a session
router.put('/session/:sessionId', (req, res) => {planningPokerController.joinSession});

// Route to create a user
router.post('/user', (req, res) => {planningPokerController.createUser});

// Route to estimate a task
router.post('/estimate/:sessionId/:storyId', (req, res) => {planningPokerController.estimateTask});

// Route to reveal task estimates
router.get('/revealEstimates/:sessionId/:taskId', (req, res) => {planningPokerController.revealEstimates});

module.exports = router;
