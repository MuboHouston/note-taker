const fs = require('fs');
const path = require('path');

function createNewNotes (body, notes) {
    console.log(`body:`, body)
 
    const note = body;
    notes.push(note)
    
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, 1)
    )

    //return finished code to post route for response
    return 
}

function validateNote(note) {
    // console.log(`note:`, note)
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(id, notes) {
    notes.splice(id, 1);
    console.log(`newNotesArray:`, notes)

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
}
module.exports = {
    createNewNotes,
    validateNote,
    deleteNote
}