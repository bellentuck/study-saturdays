const express = require('express');
const router = express.Router();
let { students, idMaker } = require('../studentData');

// DB Helper Functions:
// "findStudent"
// input: id
// output: a single student from the db, or undefined
// takes our student table. callback takes in a single student, compares it to the id we passed in. returns true if they are equal.
const findStudent = id => students.find(student => +student.id === +id);


// '/' === 'localhost:3000/api/students/'

/* Routes */
// GET all students: localhost:3000/api/students
router.get('/', (req, res, next) => {
  try {
    res.json(students); // 200 status code by default
  } catch (err) {
    next(err);
  }
});

// GET student by id: localhost:3000/api/students/:id
router.get('/:id', (req, res, next) => {
  try {
    const selectedStudent = findStudent(req.params.id);
    if (!selectedStudent) {
      res.status(404).json(`Couldn't find that student in the db.`);
    } else {
      res.json(selectedStudent);
    }
  } catch (err) {
    next(err);
  }
});

// POST (create) a student: localhost:3000/api/students

// req.body === { name: 'Georgia' }

router.post('/', (req, res, next) => {
  try {
    const id = idMaker.next().value;
    const { name } = req.body;  // this will yield the *value* at the key of "name" in req.body
    // docs on object destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
    const newStudent = {
      id,
      name
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

// PUT (update) a student: localhost:3000/api/students/:id
router.put('/:id', (req, res, next) => {
  try {
    // 1. find the student with this id in the db
    const selectedStudent = findStudent(req.params.id);
    // 2. update this student with props off of req.body
    selectedStudent.name = req.body.name;

    res.status(202).json(selectedStudent); // statusCode 202 signifies an update
  } catch (err) {
    next(err);
  }
});

// DELETE a student: localhost:3000/api/students/:id
router.delete('/:id', (req, res, next) => {
  try {
    // filter the student out from the db
    students = students.filter(student =>
      +student.id !== +req.params.id
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
