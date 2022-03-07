const fs = require('fs');
const path = require('path');

function createNewNotes (body, notes_array) {
    console.log(`body:`, body)
 
    const note = body;
    notes_array.push(note)
    
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes_array}, null, 2)
    )

    //return finished code to post route for response
    // return notes_array
}

function validateNote(note) {
    console.log(`note:`, note)
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(id, notes_array) {
    // console.log(`idParameter:`, id, `notesArrayParameter:`, notes_array)

    notes_array = notes_array.filter(note => note.id !== id);
    // console.log(`newNotesArray:`, notes_array)

    // notes_array.push(notes_array)

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes_array}, null, 2)
    )
    // return notes_array
}
module.exports = {
    createNewNotes,
    validateNote,
    deleteNote
}