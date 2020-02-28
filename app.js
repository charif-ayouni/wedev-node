const express = require('express')
const app = express()


app.get('/', function (req, res) {
  res.send('Hello World')
})

// serveur
app.listen(3000)