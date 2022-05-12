//npm module
const fs = require('fs')
const router = require('express').Router();
const path = require('path')

const {updateDb} = require('../../lib/notes');

fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) =>{
    if (err) throw err;
    var notes = JSON.parse(data)

    router.get("/notes", (req, res) => {
        res.json(notes)
    })

    router.post('/notes', (req, res) => {
        req.body.id = notes.length.toString();
        let newNote = req.body;
        notes.push(newNote);
        updateDb(notes);
        console.log("Added new note", newNote)
        return
    })

    router.delete('/notes/:id', (req, res) => {
    notes.splice(req.params.id, 1);
    updateDb(notes);
    console.log("Deleted note", notes)
    })
})

module.exports = router;