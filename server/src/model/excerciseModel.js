const mongoose = require("mongoose");

const excerciseSchema = new mongoose.Schema({
    excercise : {
        type : String,
        required : true
    }, 
    reps : {
        type : Number,
        required : true
    }
}, {timestamps : true});

module.exports = new mongoose.model("Excercise", excerciseSchema);

