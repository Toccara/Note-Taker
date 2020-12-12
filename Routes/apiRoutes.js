const fs = require("fs");
const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", (req, res) => {
    store
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    store
        .addNote(req.body)
        //fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) =>
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = function (router) {

    router.get("/api/notes", (req, res) => {
        //read the db.json file to get all notes
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err)
                throw err;
            const notes = JSON.parse(data);
            return res.json(notes);
        });
    });
}
//fs.writeFile(
    //__dirname + "/../db/db.json",
   // JSON.stringify(deleteNote),
    //"utf8",
  //  (err) => {
      //if (err) throw err;
      //res.end();