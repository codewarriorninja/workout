import express from 'express'
import cors from 'cors'
import router from './routes/workout.js';
import { connectDB } from './config/db.js';


const MONGODB_URI = process.env.MONGODB_URI
const app = express();

app.use(express.json());

const port = process.env.PORT || 6000

app.use(cors())

connectDB(MONGODB_URI);

app.use('/api/workouts', router)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
});
