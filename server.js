// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//Setup port
const port = 8000;

//Setup Server listening
const server = app.listen(port, ()=>{console.log(`listening on localhost:${port}`)});


//GET route
app.get('/all', (req, res)=>{
    res.send(projectData)
});

//POST route

app.post('/add', (req, res)=>{
    /*I liked most the object project data type because I was using the .push method for arrays, 
    but I was getting to much erros and also to update the UI the browser had problems too.*/
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userFeelings = req.body.userFeelings;
    res.send(true);
});
