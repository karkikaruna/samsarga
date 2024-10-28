import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export const dbConnection = () =>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName: "job_board",

    })
    .then(() =>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log("couldn't connect to database");
    });

};





