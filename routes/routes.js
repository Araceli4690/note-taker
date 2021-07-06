//dependencies
const { response } = require('express');
const fs = require('fs');
const path = require('path');

//
module.exports = app => {
// html routes
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, './develop/public/notes.html'));
    });
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, './develop/public/index.html'));
    });

//api get&post route
    fs.readFile('./develop/db/db.json','utf8', (err, data) => {
        if (err) {
            return console.log(err);
        };

        let notes = JSON.parse(data);

        console.log('returning notes data:' + JSON.stringify(notes));

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {
            
            let newNote = req.body;
            console.log('New Note Created:' + JSON.stringify(newNote));

            notes.push(newNote);

            fs.writeFile('./develop/db/db.json',JSON.stringify(notes));
            //res.json(notes);
        });
    })

};