import mongoose from 'mongoose';

//  1. create a schema 

const noteSchema = new mongoose.Schema (
    {
    title: {
        type : String,
        required : true
    },
    content: {
        type : String,
        required : true
    }
    },
    {
        timestamps: true
    } // this will give createdAt and updatedAt fields
);

//  2. create a model based on that schema

const Note = mongoose.model("Note", noteSchema);

export default Note;