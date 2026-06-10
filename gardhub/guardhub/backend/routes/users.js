const express = require('express');
const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (demo)
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'guard'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'supervisor'
      }
    ]
  });
});

// @route   POST /api/users
// @desc    Create a user (demo)
// @access  Public
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  res.status(201).json({
    success: true,
    message: 'User created (demo)',
    data: {
      id: Date.now(),
      name,
      email,
      role: role || 'guard'
    }
  });
});

// @route   GET /api/users/:id
// @desc    Get user by ID (demo)
// @access  Public
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'guard'
    }
  });
});

module.exports = router;