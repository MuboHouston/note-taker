//npm modules
const express = require ('express');
const path = require ('path');

const PORT = process.env.PORT || 3001;
const app = express();

//routes that the front-end can request data from
const { notes } = require('./db/db.json');

//directs user to homepage where there is no endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//directs user to notes page when endpoint is /notes
app.get('/notes', (req, res) =>{
    // res.sendFile(path.join(__dirname, './public/notes.html'));

    let results = notes;

    console.log(req.query)

    res.json(results);
});

//wildcard route that routes users back to the homepage if a request is made for a page that does not exist
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listening for incoming requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})