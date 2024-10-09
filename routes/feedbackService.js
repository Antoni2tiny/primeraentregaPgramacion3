const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/customerFeedbackController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear un reclamo
router.post('/create', authMiddleware, feedbackController.createFeedback);

// Ruta para obtener los reclamos de un cliente
router.get('/client/:clientId', authMiddleware, feedbackController.getFeedbackByClient);

// Ruta para actualizar el estado de un reclamo
router.put('/:feedbackId', authMiddleware, feedbackController.updateFeedback);

// Ruta para cancelar un reclamo
router.delete('/:feedbackId', authMiddleware, feedbackController.cancelFeedback);

module.exports = router;
