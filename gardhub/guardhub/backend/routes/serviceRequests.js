const express = require('express');
const router = express.Router();

// GET all service requests
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Service requests route working',
    data: []
  });
});

// GET single service request
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Getting service request ${req.params.id}`,
    data: null
  });
});

// POST create service request
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Service request created',
    data: req.body
  });
});

// PUT update service request
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Updated service request ${req.params.id}`,
    data: req.body
  });
});

// DELETE service request
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Deleted service request ${req.params.id}`
  });
});

module.exports = router;