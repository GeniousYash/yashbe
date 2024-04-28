const {Router} = require("express");
const NoteModel = require("../model/noteModel");
const auth = require("../middleware/auth.middleware");

const noteRouter = Router();



noteRouter.post("/create", auth, async (req, res) => {
     const{title, description , userID} = req.body;
     try{
          const note = new NoteModel({title, description, userID, username});
          await note.save();
          res.status(201).json({
               message: "Note created successfully"
          });
     }catch(error){
          res.status(500).json({
               message: "Error creating note", error
          });
     }
});


noteRouter.get("/", auth, async (req, res) => {
     const {userID, user} = req.body;
     try{
          const notes = await NoteModel.find({userID});
          res.status(200).json({
               message: "All Notes",
               notes,
          });
     }catch(error){
          res.status(500).json({
               message: "Error while getting all notes",
               error,
          });
     }
});


noteRouter.patch("/update/:id", auth, async (req, res) => {
     const {id} = req.body;
     try{
          await NoteModel.findByIdAndUpdate({_id:id}, req.body);
          res.status(200).json({
               message: `Note updates successfully with id: ${id}`
          })
     }catch(error){
          res.status(500).json({
               message: `Error while updating the note`,
          })
     }
})


noteRouter.delete("/delete/:id", auth, async (req, res) => {
     const {id} = req.body;
     try{
          await NoteModel.findByIdAndDelete({_id:id});
          res.status(200).json({
               message: `Note deleted successfully with id: ${id}`
          })
     }catch(error){
          res.status(500).json({
               message: `Error while deleteing the note`,
          })
     }
})

module.exports = noteRouter;