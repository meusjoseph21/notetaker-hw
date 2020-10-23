const express = require('express')
const app = express()
const port = 3000

const fs = require("fs")
const path = require("path")



//middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


//routes
app.get('/api/notes', (req, res) => {

  fs.readFile(path.join(__dirname,'','./db/db.json'), (err, data) => {
    if (err){
      throw err
    }
    const notes = JSON.parse(data)
    res.json(notes)
  })
 
})

app.post("/api/notes", function(req, res){

  fs.readFile(path.join(__dirname, './db/db.json'), (err, data)  => { 

    if (err){
      return err
    }

    const newNote =  JSON.parse(data)
    const newNote2 = req.body
    newNote.push(newNote2)

    const finalNewNote = JSON.stringify(newNote)
    fs.writeFile(__dirname, "./db/db.json"), finalNewNote, (err) => {
      if (err){
        throw err
      }
    }
    res.json(newNote2)

  })

})

app.delete("/api/notes/:id")

//listeners

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})