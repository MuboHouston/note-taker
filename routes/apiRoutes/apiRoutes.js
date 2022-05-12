//node modules
const fs = require('fs')
const path = require ('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid')

const { createNewNotes, validateNote, deleteNote } = require('../../lib/notes');
// var { notes_array } = require('../../db/db.json'); 

fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data)

    router.get("/notes", (req, res) => {
        res.json(notes)
    })

    router.post('/notes', (req, res) => {
        //set id based on what the next index of the array will be
        req.body.id = uuidv4();

        //if any data in req.body is incorrect, send 400 error back
        if(!validateNote(req.body)) {
            res.status(400).send('Please ensure that your note includes a title and text!')
        } 
        
        const note = createNewNotes(req.body, notes)
        res.json(note)
    })

router.delete('/notes/:id', (req, res) => {
    //gets the id number
    const id = req.params.id;
    console.log(`DELETE Req Called on id number ${id}`)

    deleteNote(id, notes)

    res.json(notes)

})
})
module.exports = router;