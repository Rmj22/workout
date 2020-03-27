const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan")
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

const MONGODB_URI = 'mongodb+srv://Robin:juanita1@workoutplan-cxiwb.mongodb.net/test?retryWrites=true&w=majority'
// const mongodb = process.env.MONGODB_URI || "mongodb://localhost/workout";
db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
})

db.on('error', (err) => {
  console.log(err)
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(express.static("public"));

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/workout', {useNewUrlParser:true});

// routes
require("./routes/api-routes")(app);
require("./routes/html-route") (app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
