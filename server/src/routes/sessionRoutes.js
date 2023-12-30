const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Route to create a new planning poker session
router.post('/', sessionController.createSession);

// Route to join a session
router.put('/:id', sessionController.joinSession);

// Route to reveal item estimates
router.get('/:id', sessionController.revealEstimates);


module.exports = router;
