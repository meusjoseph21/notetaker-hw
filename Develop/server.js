const express = require('express')
const app = express()
const port = 3000

const fs = require("fs")
const path = require("path")


//middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//routes
app.get('/api/notes', (req, res) => {

  res.sendFile(path.join(__dirname,'','./db/db.json'))
 
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
    fs.writeFile(__dirname, "./db/db.json"), createNote,)

  })
  

  

  res.end()

})

app.delete("/api/notes/:id")

//listeners

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})