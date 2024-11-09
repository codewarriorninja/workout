import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
const [workouts, setWorkouts] = useState([]);

const fetchWorkouts = async() => {
    try {
    const response = await fetch('http://localhost:8000/api/workouts')
    
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    const data = await response.json();
    setWorkouts(data);
    } catch (error) {
        console.error(error)
    }
}
    useEffect(() => {
        fetchWorkouts();
    },[])

    const handleDeleteWorkout = (id) => {
        setWorkouts(workouts.filter(workout => workout._id !== id));
      }
      
  return (
    <div className="home">
     <div className="workouts">
        {workouts && workouts.map((workout) => (
           <WorkoutDetails key={workout._id} workout={workout} onDelete={() => handleDeleteWorkout(workout._id)} />
        ))}
     </div>
     <WorkoutForm onAddWorkout={fetchWorkouts}/>
    </div>
  )
}

export default Home