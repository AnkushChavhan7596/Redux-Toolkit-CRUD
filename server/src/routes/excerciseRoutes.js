const router = require("express").Router();
const {addExcercise, getExcercises, deleteExcercise, updateExcercise} = require("../controller/excerciseController");

router.post("/add", addExcercise);

router.get("/excercises", getExcercises);

router.delete("/delete/:id", deleteExcercise);

router.patch("/update/:id", updateExcercise);

module.exports = router;