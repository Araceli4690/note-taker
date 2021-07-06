//creating dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");


// port & initialize app 
const app = express();
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('API server now on port 3001!');
});

app.use(express.static(__dirname));

//setting express for data parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
require('./routes/routes')(app);