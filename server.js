//npm module
const express = require ('express');

const PORT = process.env.PORT || 3001;
const app = express();
const htmlRoutes = require('./routes/htmlRoutes');

//middleware/parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
//parse incoming JSON data
app.use(express.json());

app.use('/', htmlRoutes);

app.post('/notes', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body)
})

//listening for incoming requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})