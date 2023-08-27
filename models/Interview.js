const mongoose= require('mongoose');

// Define the schema for the Interview
const InterviewSchema=mongoose.Schema({
    
    InterviewId:{
        type:String,
        required:true,
        unique:true
    },
    CompanyName:{
        type:String,
        required:true
    },
    JobRole:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:"student",

    }]
    
},
{timeStamp:true})

module.exports =mongoose.model('Interview',InterviewSchema);