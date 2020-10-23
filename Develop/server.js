const express = require('express')
const fs = require("fs")
const path = require("path")
const uuid = require("uuid")
const app = express()
const port = 3000



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
      throw err
    }

    const newNote =  JSON.parse(data)
    const newNote2 = req.body
    newNote2.id = uuid.v4() 
    newNote.push(newNote2)

    const finalNewNote = JSON.stringify(newNote)
    fs.writeFile(path.join(__dirname, "./db/db.json"), finalNewNote, (err) => {
      if (err){
        throw err
      }
    })
    res.json(newNote2)

  })

})

app.delete("/api/notes/:id" ,function(req, res){
  const uniqueID =  req.params.id
  fs.readFile(path.join(__dirname,'','./db/db.json') ,function(err, data){
    if (err){
      throw err
    }
    const notes = JSON.parse(data)
    const noteDelete = notes.filter(
      (noteObj) => noteObj.id !== uniqueID
    );

    fs.writeFile("./db/db.json", JSON.stringify(noteDelete), function (err, data){
      if (err){
        throw err
      }
    })

  })
})

//listeners

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})