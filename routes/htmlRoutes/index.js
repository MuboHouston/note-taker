//npm module
const path = require ('path');
const router = require('express').Router();

//routes that the front-end can request data from
const { notes } = require('../../db/db.json');

//directs user to homepage where there is no endpoint
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//directs user to notes page when endpoint is /notes
router.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

//wildcard route that routes users back to the homepage if a request is made for a page that does not exist
router.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;