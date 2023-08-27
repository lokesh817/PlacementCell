const mongoose = require('mongoose');
const studentSchema = require('../models/Student');
const interviewSchema=require('../models/Interview');
const courseSchema=require('../models/CourseScore');
const Result=require('../models/resultSchema');
const resultSchema = require('../models/resultSchema');
module.exports.renderStudentForm=async(req,res)=>{
    res.render('addStudent',{
        title:'AddStudent | Placement',
    })
}
module.exports.addStudent=async (req,res)=>{
    let count= await studentSchema.countDocuments();
    const { Name, Batch, College, Status }=req.body;
    try{
        const student= await studentSchema.create({
            StudentId:`S0${++count}`,
            StudentName:Name,
            Batch:Batch,
            College: College,
            Status: Status
        });
        return res.redirect('/home');
    }catch(error){
        res.status(400).render('error', { message: "Bad Request" });
    }
    
}
module.exports.editStudent=async (req,res)=>{
    const studentid=req.query.studentID;
    const studentDetails= await studentSchema.findOne({StudentId:studentid});
    const allInterviews=await interviewSchema.find({});
    
    try{
        res.render('editStudent',{
            title:'Placement | Update Student',
            student:studentDetails,
            interviews:allInterviews
        })
    }catch(error){
        res.status(500).json({ error: error.message || 'error in editing students' });
    }
}
module.exports.update=async(req,res)=>{
    const {StudentID, Status}= req.body;
    try{
        const student=await studentSchema.findOneAndUpdate({StudentId:StudentID},{$set:{Status:Status}},{new:true});
        
    }catch(error){
        res.status(500).json({ error: error.message || 'error in updating student status' });
    }
    res.redirect('back');
}
module.exports.addCourseScore=async(req,res)=>{
    const { StudentID, DSA, WEB, React }=req.body;
    try{
        const student = await studentSchema.findOne({StudentId:StudentID});
        const studentId = new mongoose.Types.ObjectId(student._id);
        const course =await courseSchema.findOne({studentId:studentId});
        // Add course details
        if(course){
            course.studentId= studentId,
            course.DSAFinalScore=DSA,
            course.WebDFinalScore=WEB,
            course.ReactFinalScore=React
            await course.save();
        }else{
            const Course = await courseSchema.create({
                studentId: studentId,
                DSAFinalScore: DSA,
                WebDFinalScore: WEB,
                ReactFinalScore: React
            });
        }
        

        // Do something with the 'Course' variable if needed

    }catch(error){
        res.status(500).json({ error: error.message || 'error in updating student Course Details ' });
    }
    res.redirect('back');
}

module.exports.viewStudent=async(req,res)=>{
    try{
        const students=await studentSchema.find({});
        res.render('students',{
            title:" Placement | All Student",
            students:students
        })
    }catch(error){
        res.status(500).json({ error: error.message || 'Error in fetching all Students Details' });
    }
}
module.exports.viewReport=async(req,res)=>{
    try{
        const students=await studentSchema.find({}).populate('Interviews');
        const CourseDetails=await courseSchema.find({});
        const result=await resultSchema.find({});
        res.render('report',{
            title: "Report",
            Students:students,
            Courses:CourseDetails,
            Result:result
        })
    }catch(error){
        res.status(500).json({ error: error.message || 'Unable to fetch report' });
    }
    
}