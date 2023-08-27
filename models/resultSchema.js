const mongoose =require('mongoose');

// Define the schema for the Results
const resultSchema = new mongoose.Schema({
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
      required: true,
    },
    result: {
      type: String,
      enum: ['PASS', 'FAIL', 'On Hold', `Did not Attempt`],
      required: true,
    },
},{
    timestamps:true,
});

module.exports=mongoose.model("result",resultSchema);