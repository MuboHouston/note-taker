//npm module
const fs = require('fs')
const path = require ('path');
const router = require('express').Router();

let { notes_array } = require('../../db/db.json');
const { createNewNotes, validateNote } = require('../../lib/notes');

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
    console.log(`DELETE Req Called on id number ${id}`)
    
    const deleted = notes_array.find(note => note.id === id)
    if(deleted){
        console.log(deleted)
        notes_array = notes_array.filter(note => note.id !== id)
        console.log(notes_array)
        return res.json(notes_array)
    } else {
        res.status(404).json({ message: "Note does not exist"})
    }
})


module.exports = router;