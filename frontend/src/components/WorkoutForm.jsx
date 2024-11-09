import { useState } from "react"

const WorkoutForm = ({onAddWorkout}) => {

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFileds] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const workout = {
            title,
            load,
            reps
        }

        const response = await fetch('http://localhost:8000/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
          setError(json.error)
          setEmptyFileds(json.emptyFields)
        }

        if(response.ok){
            setTitle(''),
            setLoad(''),
            setReps(''),
            setError(null)
            setEmptyFileds([]);
            console.log('new workout added')
            onAddWorkout();
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error':''}  />
        <label>Load (in Kg):</label>
        <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error':''} />
        <label>Reps:</label>
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error':''} />
        <button>Add workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm