const fs = require('fs');
const path = require('path');

function createNewNotes (body, notes_array) {
    const note = body;
    notes_array.push(note)
    
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes_array}, null, 2)
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
module.exports = {
    createNewNotes,
    validateNote
}