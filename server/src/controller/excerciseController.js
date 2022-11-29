const excerciseModel = require("../model/excerciseModel");

const addExcercise = async (req, res) =>{
    try{

        const excercise = await excerciseModel.create({
            excercise : req.body.excercise, 
            reps : req.body.reps
        })

        if(excercise){
            console.log(excercise)
            res.json({excercise : excercise, msg : "Excercise added successfully !"});
        }
        else{
            res.json({msg : "Excercise not added, something wents wrong !!"});
        }

    }catch(err){
        console.log(err.message);
        res.json({msg : err.message});
    }

}

const getExcercises = async (req, res) =>{
    try{
        const excercises = await excerciseModel.find();
        console.log(excercises)
        res.json({excercises : excercises})
    }
    catch(err){
        console.log(err.message);
        res.json({msg : "Something wents wrong"});
    }
}

const deleteExcercise = async (req, res) =>{
    try{
        
      const delExcercise = await excerciseModel.findByIdAndDelete(req.params.id);
      console.log("Excercise deleted successfully !!")
      console.log(delExcercise)
      res.json({excercise: delExcercise, msg : "Excercise deleted successfully !!"}); 

    }catch(err){
        res.json({msg : err.message})
        console.log(err.message);
    }
}

const updateExcercise = async (req, res) => {
    try{
        console.log(req.params.id, req.body.newExcercise, req.body.newReps)

        const updateExc = await excerciseModel.findByIdAndUpdate(req.params.id, {
            excercise : req.body.newExcercise,
            reps : req.body.newReps
        });

        if(updateExc){
            console.log(updateExc)
            res.json({excercise:updateExc, msg:"Excercise updated successfully !"})
        }

    }
    catch(error){
        res.json({msg : error.message})
        console.log(error.message);
    }
}

module.exports = { addExcercise, getExcercises , deleteExcercise , updateExcercise }