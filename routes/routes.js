//dependencies
const fs = require('fs');
const path = require('path');


//creating uuid
const {v4: uuidv4} = require('uuid');
uuidv4();


module.exports = app => {
// html routes
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

//api get&post route
    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err) {
            return console.log(err);
        };

        let notes = JSON.parse(data);

        //console.log('returning notes data:' + JSON.stringify(notes));

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {
            
            let newNote = req.body;
            //unique id created
            newNote.id = uuidv4();
            notes.push(newNote);

            //uodating db
            newNotes();
            
            console.log('New Note Created:' + JSON.stringify(newNote));
        });
       
        //function to update db
        function newNotes() {
            fs.writeFile("./db/db.json",JSON.stringify(notes),err => {
                if (err) {
                    return console.log(err);
                }
            });
        };

        //delete func?
    });

};
