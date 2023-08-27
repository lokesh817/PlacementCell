const mongoose =require('mongoose');
const InterviewSchema = require('../models/Interview');
const StudentSchema = require('../models/Student');
const ResultSchema = require('../models/resultSchema');
const CourseSchema = require('../models/CourseScore');
module.exports.renderInterviewForm= async(req,res)=>{
    res.render('addInterview',{
        title:'Placement | Add Interview',
    })
}
module.exports.addInterview= async(req,res)=>{
    if(req.isAuthenticated){
        try{
            let count = await InterviewSchema.countDocuments();
            const { Name, Role, Date}=req.body;
            const interview= await InterviewSchema.create({
                InterviewId:`I0${++count}`,
                CompanyName:Name,
                JobRole:Role,
                Date:Date
            });
            return res.redirect('/home');
        }
        catch(error){
            res.status(500).json({message:"Bad Request"})
        }
    }else{
        res.status(500).json({message:"from add interview "});
    }
    
}
module.exports.editInterview=async (req,res)=>{
    const interviewid=req.query.interviewID;
    const interviewDetail= await InterviewSchema.findOne({InterviewId:interviewid}).populate('student');
    const allStudents=await StudentSchema.find({});
    try{
        res.render('editInterview',{
            title:' Edit Interview',
            students:allStudents,
            interview:interviewDetail,
            interviewStudents: interviewDetail.student,
        })
    }catch(error){
        res.status(500).json({ error: error.message || 'Can not edit interview' });
    }
}
module.exports.assignInterview=async(req,res)=>{
    const {InterviewId }= req.body;
    const studentIDS=req.body.selectedStudents;
    try{
        const interview= await InterviewSchema.findOne({InterviewId:InterviewId});
        const students= await StudentSchema.find({StudentId: { $in :studentIDS}});
        await InterviewSchema.updateOne({ _id: interview._id }, { $addToSet: { student: { $each: students.map(student => student._id) } } });
        await StudentSchema.updateMany({ _id: { $in: students.map(student => student._id) } }, { $addToSet: { Interviews: interview._id } });
        res.redirect('back');
    }catch(error){
        res.status(500).json({ error: error.message || 'Interview not assigned yet' });
    }
    
}
module.exports.updateInterviewResult= async(req,res)=>{
    const {InterviewId,studentID,result}=req.body;
    const interview= await InterviewSchema.findOne({InterviewId:InterviewId});
    const student=await StudentSchema.findOne({StudentId:studentID});
    try{
        // Check for uniqueness based on interviewId or studentId
        const existingResult = await ResultSchema.findOne(
            {
                $or: [
                    { interview: interview._id, student: student._id },
                ],
            });

        if (!existingResult) {
            // If no matching document found, insert new result
            const newResult = new ResultSchema({
                interview: interview._id,
                student: student._id,
                result:result
            });
            try {
                await newResult.save();
            } catch (error) {
                res.status(500).json({ error: error.message || 'An error occurred' });
            }
        } else {
            res.status(500).json({ message:'result already exists' });
        }
        res.redirect('back');
    }catch(error){
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
}
module.exports.Report= async(req,res)=>{
    const interviewid=req.query.interviewid;
    try{
        const interviewDetail= await InterviewSchema.findOne({InterviewId:interviewid}).populate('student');
        const Result = await ResultSchema.find({interview:interviewDetail._id}).populate('student interview');
        const student=interviewDetail.student;
        const studentIds = student.map(student => student._id);
        const course = await CourseSchema.find({ studentId: { $in: studentIds } });
        res.render('SingleInterviewReport',{
            title: "Report",
            Interview:interviewDetail,
            Students:student,
            Course:course,
            Result:Result

        })
    }catch(error){
        res.status(500).json({ error: error.message || 'Report not generated' });
    }
}
module.exports.viewInterview= async(req,res)=>{
    const Interviews=await InterviewSchema.find({});
    res.render('interviews',{
        title:" Placement | Interview",
        Interviews:Interviews
    })
}