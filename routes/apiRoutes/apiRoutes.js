//npm module
const fs = require('fs')
const path = require ('path');
const router = require('express').Router();

const { createNewNotes, validateNote, deleteNote } = require('../../lib/notes');
var { notes_array } = require('../../db/db.json'); 

router.get("/notes", (req, res) => {
    
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {throw err
        } else {
            return res.json(JSON.parse(data).notes_array)
        }
    })
})

router.post('/notes', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);

    //set id based on what the next index of the array will be
    req.body.id = notes_array.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('Please ensure that your note includes a title and text!')
    } else {
    const note = createNewNotes(req.body, notes_array)
    res.json(note)
    }
})

router.delete('/notes/:id', (req, res) => {
    //gets the id number
    const { id } = req.params;
    // console.log(`DELETE Req Called on id number ${id}`)
    const deletedNote = notes_array.find(note => note.id === id)

    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) {throw err
        } else {
        console.log(deletedNote)
        res.status(200).json(deleteNote(deletedNote.id, JSON.parse(data).notes_array))
        }
    })
})

module.exports = router;