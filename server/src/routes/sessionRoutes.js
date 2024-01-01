const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Route to create a new planning poker session
router.post('/', sessionController.createSession);

// Route to join a session
router.put('/:id', sessionController.joinSession);

// Route to estimate a item
router.post('/:id/estimate', sessionController.estimate);

// Route to reveal item estimates
router.get('/:id/reveal', sessionController.revealEstimates);

module.exports = router;
