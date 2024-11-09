import mongoose from "mongoose";


export const connectDB = async(MONGODB_URI) => {
    try {
       const con = await mongoose.connect(MONGODB_URI)
       console.log(`MongodbConnected: ${con.connection.host}`) 
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}