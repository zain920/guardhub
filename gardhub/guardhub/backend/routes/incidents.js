const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ reportedAt: -1 });
    res.json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching incidents',
      error: error.message
    });
  }
});

// GET single incident
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }
    res.json({
      success: true,
      data: incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching incident',
      error: error.message
    });
  }
});

// POST create incident
router.post('/', async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Incident created successfully',
      data: incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating incident',
      error: error.message
    });
  }
});

// PUT update incident
router.put('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }
    res.json({
      success: true,
      message: 'Incident updated successfully',
      data: incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating incident',
      error: error.message
    });
  }
});

// DELETE incident
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }
    res.json({
      success: true,
      message: 'Incident deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting incident',
      error: error.message
    });
  }
});

// GET incidents by severity
router.get('/severity/:level', async (req, res) => {
  try {
    const incidents = await Incident.find({ severity: req.params.level });
    res.json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching incidents',
      error: error.message
    });
  }
});

// GET incidents by status
router.get('/status/:status', async (req, res) => {
  try {
    const incidents = await Incident.find({ status: req.params.status });
    res.json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching incidents',
      error: error.message
    });
  }
});

module.exports = router;