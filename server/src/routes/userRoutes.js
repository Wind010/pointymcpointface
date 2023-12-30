const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a user
router.post('/', userController.createUser);

// Route to estimate a item
router.post('/estimate/:sessionId/:storyId', userController.estimate);


module.exports = router;
