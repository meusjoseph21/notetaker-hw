const express = require('express')
const app = express()
const port = 3000
const util = require("util")
const fs = require("fs")
const readFileAsync = util.promisify(fs.readFile);

//middleware
app.use(express.static("public"))


//routes
app.get('/api/notes', (req, res) => {

    let data =  fs.readFileSync("db.json")
    let data2 = JSON.parse(data)
    res.send(data2)
    console.log(data2)
})

app.post('/api/notes', (req, res) => {

    let data =  fs.readFileSync("db.json")
    let data2 = JSON.parse(data)
    res.send(data2)
    console.log(data2)
    
})

//listeners

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})