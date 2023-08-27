const mongoose= require('mongoose');

// Define the schema for the Course Scores
const courseScoresSchema = new mongoose.Schema({
  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'student',
  },
  DSAFinalScore: {
    type: Number,
    required: true,
  },
  WebDFinalScore: {
    type: Number,
    required: true,
  },
  ReactFinalScore: {
    type: Number,
    required: true,
  },
})

module.exports=mongoose.model("CourseScore",courseScoresSchema);