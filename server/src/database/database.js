const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected Successfully !!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;

// jbbSlawwWJUdty3n
