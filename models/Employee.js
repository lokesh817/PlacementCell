const mongoose= require('mongoose');

// Define the schema for the Employee
const employeeSchema=mongoose.Schema({
    empName:{
        type:String,
        required:true
    },
    empEmail:{
        type:String,
        required:true,
        unique:true
    },
    empId:{
        type:String,
        required:true
    },
    empPassword:{
        type:String,
        required:true
    }

},
{timeStamp:true})

module.exports =mongoose.model('employee',employeeSchema);