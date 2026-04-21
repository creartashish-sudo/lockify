const Feedback = require('../Models/Feedback');

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("userId", "name email contact");
        res.status(200).json({
            success: true,
            data: feedbacks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({
            success: true,
            message: 'Feedback created successfully',
            data: feedback,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {getAllFeedbacks, createFeedback};