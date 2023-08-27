const mongoose= require('mongoose');

// Define the schema for the Student
const studentSchema=mongoose.Schema({
    StudentId:{
        type:String,
        required:true,
        unique:true
    },
    StudentName:{
        type:String,
        required:true
    },
    Batch:{
        type:String,
        required:true
    },
    College: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['placed', 'not_placed'],
        default: 'not_placed',
    },
    Interviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Interview',
        }
    ]
},
{timeStamp:true})

module.exports =mongoose.model('student',studentSchema);