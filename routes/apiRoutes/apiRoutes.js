//npm module
const path = require ('path');
const router = require('express').Router();

const { notes_array } = require('../../db/db.json');
const { createNewNotes, validateNote } = require('../../lib/notes')

router.get("/notes", (req, res) => {
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(data)
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

//wildcard route that routes users back to the homepage if a request is made for a page that does not exist
router.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;