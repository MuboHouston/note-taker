//npm module
const express = require ('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
const htmlRoutes = require('./routes/htmlRoutes');

const { notes } = require('./db/db.json');

//middleware/parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
//parse incoming JSON data
app.use(express.json());

app.use('/', htmlRoutes);

function createNewNotes (body, notesArray) {
    const note = body;
    notesArray.push(note)
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )

    //return finished code to post route for response
    return note;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

app.post('/notes', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);

    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('Please ensure that your note includes a title and text!')
    } else {
    const note = createNewNotes(req.body, notes)
    res.json(note)
    }
})

//listening for incoming requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})