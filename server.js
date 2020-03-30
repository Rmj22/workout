// Require and instantiate express
const express = require("express");
const logger = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

// Assign port
const PORT = process.env.PORT || 3500;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://kanyesworkout:juanita1@ds249717.mlab.com:49717/heroku_90fbb3l3";

 const db = mongoose.connect(MONGODB_URI, {useNewUrlParser:true});


// db.once('open', () => {
//     console.log('Connected to MongoDB');
// })

// //check for any db errors
// db.on('error', (err) => {
//     console.log(err)
// });


//Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

// Requiring routes
require("./routes/api-routes")(app);
require("./routes/html-route")(app);

// mongoose.connect(MONGODB_URI, {useNewUrlParser:true});


app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}!`);
});