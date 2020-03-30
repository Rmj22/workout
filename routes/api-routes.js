const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Workout = require("../models/workout");
let mongoJs = require("mongojs");

module.exports = (app) => {


    app.get("/api/workouts", (req, res)=>{
        Workout.find().then(dbworkout => {
            res.json(dbworkout)
        }).catch(err=>{
            res.json(err)
        })
    })
    app.get("/api/workouts/range", (req, res)=>{
        Workout.find({})
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.json(err)
        })
    })

    app.post("/api/workouts", (req, res)=>{
        console.log("POST")
        Workout.create({})
        .then(workoutData=>{
            res.json(workoutData)
        })
        .catch( err=>{
            res.json(err)
        })
    })

    app.put("/api/workouts/:id", ({body,params}, res)=>{
        console.log("POSTED");
        // console.log(req.body);
        // console.log("ID " + req.params.id);
       Workout.findByIdAndUpdate(
          params.id,
          {$push:{exercises:body}},
          {new:true, runValidators:true}
       ).then(dbworkout =>{
           res.json(dbworkout)
       }).catch( err => {
           res.json(err)
       })
        
    })
}
