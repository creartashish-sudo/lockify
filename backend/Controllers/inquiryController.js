// const express = require('express');
const Inquiry = require('../Models/Inquiry');

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.status(200).json({
            success: true,
            data: inquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createInquiry = async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json({
            success: true,
            message: 'Inquiry created successfully',
            data: inquiry,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {getAllInquiries, createInquiry};

