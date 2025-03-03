import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const Connection=()=>{
    try{
        mongoose.connect(process.env.URL);
        console.log("DB Created");
    }catch(err){
        console.log("Error: "+ err);
    }
};
Connection();
