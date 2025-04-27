const express = require('express');
const router = express.Router();
const studentController = require('../models/student');

router.post('/', async (req, res) => {
  try {
    const result = await studentController.createStudent(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await studentController.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/courses', async (req, res) => {
  try {
    const studentWithCourses = await studentController.getStudentWithCourses(req.params.id);
    res.json(studentWithCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await studentController.updateStudent(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await studentController.deleteStudent(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
