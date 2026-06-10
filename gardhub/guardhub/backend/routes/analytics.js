const express = require('express');
const router = express.Router();

// GET analytics dashboard data
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalGuards: 24,
      activeIncidents: 3,
      pendingRequests: 7,
      totalRevenue: 132000,
      revenueGrowth: 22,
      clientSatisfaction: 4.6,
      guardUtilization: 87,
      avgResponseTime: 12.5
    }
  });
});

// GET incident trends
router.get('/incident-trends', (req, res) => {
  res.json({
    success: true,
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      critical: [3, 5, 2, 4],
      high: [7, 9, 6, 8],
      medium: [12, 15, 10, 14],
      low: [8, 10, 7, 9]
    }
  });
});

// GET revenue by service
router.get('/revenue-by-service', (req, res) => {
  res.json({
    success: true,
    data: {
      labels: ['Standing Guard', 'Mobile Patrol', 'Event Security', 'Fire Watch', 'Alarm Response'],
      values: [45000, 32000, 28000, 15000, 12000]
    }
  });
});

// GET guard performance
router.get('/guard-performance', (req, res) => {
  res.json({
    success: true,
    data: {
      guards: ['Mike J', 'Sarah W', 'Tom B', 'Lisa C', 'James W', 'Maria G'],
      shifts: [22, 25, 18, 20, 23, 19],
      incidents: [5, 8, 3, 4, 6, 2]
    }
  });
});

module.exports = router;
