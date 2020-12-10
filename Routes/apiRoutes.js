const fs = require("fs");
module.exports = (app) => {
    //request and response from notes db.json file
    app.get("/api/notes", (req, res) => {
        //read the db.json file to get all notes
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            //parsed notes that user will see
            return res.json(notes);
        });
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        let allNotes = [];
        let id = 0;
        fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            allNotes = JSON.parse(data);
            for (let i = 0; i < allNotes.length; i++) {
                if (allNotes[i].id > id) {
                    id = allNotes[i].id;
                }
            }
            newNote.id = parseInt(id) + 1;
            allNotes.push(newNote);
            fs.writeFile(
                __dirname + "/../db/db.json",
                JSON.stringify(allNotes),
                "utf8",
                (err) => {
                    if (err) throw err;
                    res.end();
                }
            );
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        const deleteID = req.params.id;
        fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const deleteNote = JSON.parse(data).filter((entry) => {
                return entry.id != deleteID;
            });
            fs.writeFile(
                __dirname + "/../db/db.json",
                JSON.stringify(deleteNote),
                "utf8",
                (err) => {
                    
                    if (err) throw err;
                    res.end();
                }
            );
        });
    });
};