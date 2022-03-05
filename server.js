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

app.post('/notes', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);

    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const note = createNewNotes(req.body, notes)

    res.json(note)
})

//listening for incoming requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})