const express=require('express');
const router=express.Router();
const auth=require("../config/auth");
const setLocals=require("../config/setLocals");
const { addStudent,viewStudent,renderStudentForm,editStudent,update,addCourseScore ,viewReport} = require('../controllers/student_controller');
router.use(auth);
router.use(setLocals);
router.get('/add-student',renderStudentForm);
router.post('/add-student',addStudent);
router.get('/edit_Student',editStudent);
router.post('/update-student',update);
router.get('/view_student',viewStudent);
router.post('/update-student-Course-Details',addCourseScore);
router.get('/report',viewReport);


module.exports = router;