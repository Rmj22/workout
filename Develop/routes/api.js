const router = require("express").Router();
const mongojs = require("mongojs");
const db = require("../models/index");
const path = require("path");

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(results => {
        console.log(results);
      res.json(results);
    })
    .catch(({ message })=> {
      console.log( message );
    });
});

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html')) 
});

router.put('/api/workouts/:id', (req, res) => {
    const body = req.body;

    db.Workout.updateOne(
        {_id: mongojs.ObjectID(req.params.id)},
        {
            $push: {
                exercises: {
                    type: body.type,
                    duration: body.duration,
                    name: body.name,
                    reps: body.reps,
                    distance: body.distance,
                    weight: body.weight,
                    sets: body.sets

                }
            }
        } .then(update => {
            res.json(update)
        }).catch(err => {
            res.status(400).json(err)
        })
    )
} )

router.get('/api/workouts', (req, res) => {
db.Workout.find({})
.then(dbWorkout => {
    res.json(dbWorkout)
})
.catch(err => {
    res.json(err);
})
})

module.exports = router;
