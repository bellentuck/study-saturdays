const express = require('express');
const router = express.Router();
const students = require('./students');

// localhost:3000/api/students
router.use('/students', students);

module.exports = router;
