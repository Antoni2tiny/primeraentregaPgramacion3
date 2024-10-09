const Feedback = require('../models/feedbackModel');
const notifier = require('../notifications/notifyClient');

// Crear reclamo
exports.createFeedback = async (req, res) => {
    try {
        const { clientId, description } = req.body;
        const newFeedback = await Feedback.create({ clientId, description, status: 'Pending' });
        notifier.notifyChange(clientId, 'Reclamo creado correctamente.');
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el reclamo', error });
    }
};

// Consultar reclamos por cliente
exports.getFeedbackByClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const feedbacks = await Feedback.findAll({ where: { clientId } });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar los reclamos', error });
    }
};

// Actualizar reclamo
exports.updateFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { status, description } = req.body;
        const updatedFeedback = await Feedback.update(
            { status, description },
            { where: { id: feedbackId } }
        );
        const feedback = await Feedback.findOne({ where: { id: feedbackId } });
        notifier.notifyChange(feedback.clientId, `El estado de tu reclamo ha cambiado a: ${status}`);
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el reclamo', error });
    }
};

// Cancelar reclamo
exports.cancelFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const feedback = await Feedback.findOne({ where: { id: feedbackId } });
        if (!feedback) {
            return res.status(404).json({ message: 'Reclamo no encontrado' });
        }
        feedback.status = 'Cancelled';
        await feedback.save();
        notifier.notifyChange(feedback.clientId, 'Tu reclamo ha sido cancelado.');
        res.status(200).json({ message: 'Reclamo cancelado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar el reclamo', error });
    }
};
