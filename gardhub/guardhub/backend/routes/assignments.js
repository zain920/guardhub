const express = require('express');
const router = express.Router();

// GET all assignments
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Assignments route working',
    data: []
  });
});

// GET single assignment
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Getting assignment ${req.params.id}`,
    data: null
  });
});

// POST create assignment
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Assignment created',
    data: req.body
  });
});

// PUT update assignment
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Updated assignment ${req.params.id}`,
    data: req.body
  });
});

// DELETE assignment
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Deleted assignment ${req.params.id}`
  });
});

module.exports = router;