
const WorkoutDetails = ({workout,onDelete}) => {

  const handleDelete = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/workouts/${workout._id}`,{
        method:'DELETE'
      })

      if(!response.ok){
        throw new Error('Failed to delete workout')
      }
      onDelete(workout._id)
      alert('Workout deleted successfuly')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Load (kg):</strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default WorkoutDetails