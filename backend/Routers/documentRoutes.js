const express = require('express');

const { getDocument, insertDocument, updateDocument, deleteDocument } = require('../Controllers/documentController');
const upload = require("../middleware/documentUploads.js");

const router = express.Router();

// GET document details 
router.get('/:userId', getDocument);
// INSERT new document
router.post('/create',upload.single("photo"), insertDocument);
// UPDATE document details
router.put('/update',upload.single("photo"), updateDocument);
// DELETE document
router.delete('/delete/:id', deleteDocument);

module.exports = router;