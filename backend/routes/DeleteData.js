const express = require('express');
const mongoose=require('mongoose');
const router=express.Router();
const cors=require('cors')
const bodyParser = require('body-parser');
const Note = require('../models/Notes');
router.use(cors())
router.use(bodyParser.json());
router.delete('/deleteNote/:id', async (req, res) => { 
  try { 
    const id = req.params.id; 
    const note=Note.findById(id);
    console.log(note);
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(401).json({ message: 'Notes Not Found'});
    }

    res.status(200).json({ "Success": "Note has been deleted", note: deletedNote,success:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router