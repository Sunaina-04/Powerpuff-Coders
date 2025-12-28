import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
// const express = require('express');

dotenv.config();
// console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5001;

// connectDB();

//middleware to parse JSON bodies
app.use(express.json()); // to parse incoming request bodies in JSON format

// custom middleware to log request details
// app.use((req,res,next)=> {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// });

app.use(rateLimiter);


app.use("/api/notes",notesRoutes);

/*
// this is a sample API endpoint
app.get("/api/notes",(req,res) =>{
    // send the notes
    res.send("you got 5 notes");
});

// endpoint : endpoint is a combination of url and HTTP method that lets the client interact with special resources on the server.
// "/api/notes" is the listening url (endpoint) 

app.get("/api/notes",(req,res) =>{
    // send the notes
    res.status(200).send("you got 15 notes");
});

app.post("/api/notes",(req,res) =>{
    // create the notes 
    res.status(201).json({message:"post created successfully"})
});

app.put("/api/notes/:id",(req,res)=> {
    // updating the notes
    res.status(200).json({message:"Post updated successfully"})
})

// http://locathost:5001/api/notes/dynamicId --> this id will be deleted 

app.delete("/api/notes/:id",(req,res)=> {
    // updating the notes
    res.status(200).json({message:"Post deleted successfully"})
})
*/

// we are listening to a port 

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
});
});
