import express from 'express'
import { createWorkout, deleteWorkout, getallWorkout, getWorkout, updateWorkout } from '../controller/workoutController.js';

const router = express.Router();

//get all workout
router.get('/', getallWorkout)

//get single value based on id
router.get('/:id', getWorkout)

//Post new workout
router.post('/', createWorkout);
//delete workout
router.delete('/:id', deleteWorkout)

//update workout
router.put('/:id', updateWorkout)

export default router;
