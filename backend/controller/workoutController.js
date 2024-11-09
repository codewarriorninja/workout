import mongoose from 'mongoose';
import Workout from '../models/workoutModel.js';

//get all workouts

export const getallWorkout = async(req, res) =>{
    try {
        const allWorkouts = await Workout.find({}).sort({createdAt:-1});
        res.status(201).json(allWorkouts) 
     } catch (error) {
         res.status(400).json({Error: error.message})
     }
}


//get a single workout

export const getWorkout = async (req,res) => {

    const { id } = req.params;
     
    try {

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'Invalid id'})
        }

        const workout = await Workout.findById(id);

        if(!workout){
            return res.status(404).json({error:'No such Workout'})
        }
        res.status(200).json(workout);

    } catch (error) {
        res.status(500).json({error:error.message})
    }
   

}

//create new workout

export const createWorkout =  async(req,res) => {
    const {title, reps,load} = req.body;

    let emptyFields =[];

    if(!title && !load && !reps){
        emptyFields.push('title','load','reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill all fields',emptyFields})
    }

    try {
        const workout = await Workout.create({
            title,reps,load
        });

        res.status(201).json(workout);


    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//delete a workout
export const deleteWorkout = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid id'})
    }

    const workout = await Workout.findByIdAndDelete(id)

    if(!workout){
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(201).json(workout);
}


//update a workout
export const updateWorkout = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid id'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id}, {
        ...req.body
    }, {new:true})

    if(!workout){
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(200).json(workout);

}