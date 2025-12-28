import Note from "../models/Note.js";
// const getAllNotes = (req,res) => {
//     res.status(200).send("you just fetched the notes");
// } AKA :

export async function getAllNotes(_,res){
    try{
        const notes = await Note.find();
        // const notes = await Note.find().sort({createdAt: -1}); // to sort notes in descending order based on creation time
        res.status(200).json(notes)
    } catch (error){
        console.error("Error in getting notes:", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
    }catch (error){
        console.error("Error in getting note", error);
        res.status(500).json({message:"internal server error"});

    }
}

export async function CreateNote(req,res){
    try{
        const {title,content} = req.body
        // console.log(title,content)
        // create a new note object
        // const newNote = new Note({title: title, content: content})
        const note = new Note({title: title, content: content})
        // save it to the database
        const savedNote = await note.save()
        res.status (201).json(savedNote);
        // res.status (201).json({message: "Note created successfully"});
    } catch (error){
        console.error("Error in getting notes:", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function UpdateNote (req,res){
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content}, {new : true,});
        if (!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error){
        console.error("Error in updating notes:", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function DeleteNote (req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message: "Note not found"});
        else res.status(200).json({message: "Note deleted successfully"});
    } catch (error){
        console.error("Error in deleting notes", error);
        res.status(500).json({message:"internal server error"});
    }
}


/* manual testing of APIs
export function getAllNotes(req,res){
    res.status(200).send ("You just fecthed all the notes");
}

export function CreateNote(req,res){
    res.status(201).json({message: "you created note"});
}

export function UpdateNote (req,res){
    res.status(20).json({message: "Note updated successfully"});
}

export function DeleteNote (req,res){
    res.status(201).json({message: "Note deleted successfully"});
}
*/