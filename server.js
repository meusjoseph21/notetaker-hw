
//DEPENDENCIES ============================================
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;

//============================================

//middleware ============================================
app.use(express.static("public")); //this get index.html and notes.html

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ============================================


//routes ============================================

//Get to get the notes info
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//============================================
//post to create new note
app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }

    const newNote = JSON.parse(data);
    console.log(newNote);
    const newNote2 = req.body;
    newNote2.id = uuid.v4();
    newNote.push(newNote2);

    const finalNewNote = JSON.stringify(newNote);
    fs.writeFile(path.join(__dirname, "./db/db.json"), finalNewNote, (err) => {
      if (err) {
        throw err;
      }
    });
    res.json(newNote2);
  });
});

//============================================
//delete to delete note from saved notes
app.delete("/api/notes/:id", function (req, res) {
  const uniqueID = req.params.id;
  fs.readFile(path.join(__dirname, "", "./db/db.json"), function (err, data) {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data); //make object
    const noteDelete = notes.filter((noteObj) => noteObj.id !== uniqueID);

    fs.writeFile("./db/db.json", JSON.stringify(noteDelete), function (err) {
      if (err) {
        throw err;
      }
    });
    res.json(noteDelete);
  });
});
//============================================
//============================================


//listeners ============================================

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// ============================================