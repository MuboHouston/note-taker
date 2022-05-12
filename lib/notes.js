const fs = require('fs');

function updateDb(notes) {
    fs.writeFile('db/db.json', JSON.stringify(notes), err => {
        if (err) throw err;
        return true
    })
}

module.exports = {
    updateDb
}