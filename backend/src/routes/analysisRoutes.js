const router = require('express').Router();
router.post('/analyze', (req, res) => res.json({ message: 'AI analysis API planned' }));
router.get('/:analysisId', (req, res) => res.json({ message: 'Get analysis result API planned' }));
router.get('/job/:jobId', (req, res) => res.json({ message: 'Get job analysis results API planned' }));
module.exports = router;
