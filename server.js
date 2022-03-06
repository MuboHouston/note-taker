//npm module
const express = require ('express');
const app = express();

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes/apiRoutes');

const PORT = process.env.PORT || 3001;

//middleware/parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
//parse incoming JSON data
app.use(express.json());
//middleware that instructs the server to make files in the public directory available
app.use(express.static('public'))

app.use('/', htmlRoutes);
app.use('/api', apiRoutes)

//listening for incoming requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})