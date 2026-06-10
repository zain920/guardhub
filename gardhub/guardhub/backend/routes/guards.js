const express = require('express');
const router = express.Router();
const Guard = require('../models/Guard');
const User = require('../models/User');

// GET all guards
router.get('/', async (req, res) => {
  try {
    const guards = await Guard.find().populate('user', 'name email');
    res.json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guards',
      error: error.message
    });
  }
});

// GET single guard
router.get('/:id', async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id).populate('user', 'name email');
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }
    res.json({
      success: true,
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guard',
      error: error.message
    });
  }
});

// POST create new guard
router.post('/', async (req, res) => {
  try {
    const { 
      name, email, password, role,
      badgeNumber, phone, address, emergencyContact,
      shift, assignedSite, certifications, notes 
    } = req.body;

    // First create a user account for the guard
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'guard'
    });

    // Then create the guard profile
    const guard = await Guard.create({
      user: user._id,
      badgeNumber,
      phone,
      address,
      emergencyContact,
      shift: shift || 'day',
      assignedSite: assignedSite || null,
      certifications: certifications || [],
      notes: notes || ''
    });

    const populatedGuard = await Guard.findById(guard._id).populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Guard created successfully',
      data: populatedGuard
    });
  } catch (error) {
    // If guard creation fails, delete the user that was created
    if (error.userId) {
      await User.findByIdAndDelete(error.userId);
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating guard',
      error: error.message
    });
  }
});

// PUT update guard
router.put('/:id', async (req, res) => {
  try {
    const guard = await Guard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    // Update user email if provided
    if (req.body.email) {
      await User.findByIdAndUpdate(guard.user._id, { email: req.body.email });
    }

    res.json({
      success: true,
      message: 'Guard updated successfully',
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating guard',
      error: error.message
    });
  }
});

// DELETE guard
router.delete('/:id', async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id);
    
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    // Delete the associated user account
    await User.findByIdAndDelete(guard.user);

    // Delete the guard profile
    await Guard.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Guard deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting guard',
      error: error.message
    });
  }
});

// GET guards by status
router.get('/status/:status', async (req, res) => {
  try {
    const guards = await Guard.find({ status: req.params.status })
      .populate('user', 'name email');
    
    res.json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guards',
      error: error.message
    });
  }
});

// GET guards by shift
router.get('/shift/:shift', async (req, res) => {
  try {
    const guards = await Guard.find({ shift: req.params.shift })
      .populate('user', 'name email');
    
    res.json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guards',
      error: error.message
    });
  }
});

// GET available guards (not on leave)
router.get('/available/now', async (req, res) => {
  try {
    const guards = await Guard.find({ status: 'active' })
      .populate('user', 'name email');
    
    res.json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available guards',
      error: error.message
    });
  }
});

// POST add certification to guard
router.post('/:id/certifications', async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id);
    
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    guard.certifications.push(req.body);
    await guard.save();

    res.json({
      success: true,
      message: 'Certification added successfully',
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding certification',
      error: error.message
    });
  }
});

// DELETE certification from guard
router.delete('/:guardId/certifications/:certId', async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.guardId);
    
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    guard.certifications.id(req.params.certId).remove();
    await guard.save();

    res.json({
      success: true,
      message: 'Certification removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing certification',
      error: error.message
    });
  }
});

module.exports = router;