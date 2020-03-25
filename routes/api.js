const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
let db = require("../models");
let Workout = require("../models/Workout");
let mongoJs = require("mongojs");

module.exports = (app) => {


    app.get("/api/workouts", (req, res)=>{
        db.Workout.find({}, (err, data)=>{
            if(err) throw err;
            res.send(data);
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
        Workout.create(req.body)
        .then((workoutData)=>{
            res.json(workoutData)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    })

    app.put("/api/workouts/:id", (req, res)=>{
        console.log("POSTED");
        console.log(req.body);
        console.log("ID " + req.params.id);

        Workout.update(
            {_id:(req.params.id)},
            {
                $push:{
                    exercises:{
                        type:req.body.type,
                        name:req.body.name,
                        duration:req.body.duration,
                        weight:req.body.weight,
                        reps:req.body.reps,
                        sets:req.body.sets,
                        distance: req.body.distance
                    }
                }
            })
            .then(workoutData=>{
                res.json(workoutData)
            })
            .catch(err=>{
                res.status(400).json(err)
            })
    })
}
