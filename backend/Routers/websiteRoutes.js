const express = require('express');

const { getWebsite, insertWebsite, updateWebsite, deleteWebsite } = require('../Controllers/websiteController');

const router = express.Router();
// GET website details
router.get('/:userId', getWebsite);
// INSERT new website
router.post('/create', insertWebsite);
// UPDATE website details
router.put('/update', updateWebsite);
// DELETE website
router.delete('/delete/:id', deleteWebsite);
module.exports = router;