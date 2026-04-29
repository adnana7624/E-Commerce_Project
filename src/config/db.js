import mongoose  from "mongoose";
import dotenv from "dotenv";

const dbconnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected succesfuly")
    } catch (error) {
        console.log("db connection error",error.message);
        
        
    }
}
export {dbconnect}