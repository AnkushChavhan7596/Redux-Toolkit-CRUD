const express = require("express");
const app = express();
const port = process.env.port || 8800;
const dotenv = require("dotenv").config();
const cors = require("cors");

// ==================== database ============================
const database = require("./src/database/database");



// ==================== middleware ==========================
app.use(express.json());
app.use(cors());



// ==================== routes ==============================

app.use("/api/excercise", require("./src/routes/excerciseRoutes"));
app.get("/", (req, res)=>{
    res.send("Hello from the server")
})




// ==================== Server Listening ====================

app.listen(port, ()=>{
    console.log(`Server is listening on port : http://localhost:${port}`)
})