const express = require('express');
const router = express.Router();

// @route   GET /api/test
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// @route   GET /api/test/hello
// @desc    Another test
// @access  Public
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from GuardHub!',
    version: '1.0.0'
  });
});

module.exports = router;