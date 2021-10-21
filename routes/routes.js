//dependencies
const fs = require('fs');
const path = require('path');


module.exports = app => {

    //api get&post route
    fs.readFile('db/db.json', 'utf8', (err, data) => {

        let notes = JSON.parse(data);

        //console.log('returning notes data:' + JSON.stringify(notes));

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {

            let newNote = req.body;
            //unique id created

            notes.push(newNote);

            //updating db
            newNotes();

            console.log('New Note Created:' + JSON.stringify(newNote));
        });
        app.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id, 1])
        })
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            newNotes();
            console.log('Deleted note')
        })
        //html routes moved after api routes
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        //function to update db
        function newNotes() {
            fs.writeFile("db/db.json", JSON.stringify(notes), err => {
                if (err) {
                    return console.log(err);
                }
            });
        };
    });
};