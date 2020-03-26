const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
let db = require("../models");
let Workout = require("../models/workout");
let mongoJs = require("mongojs");

module.exports = (app) => {

    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/stats.html"));
    });
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/exercise.html"));
    })
   
}