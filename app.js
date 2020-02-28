const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://wedev:wedev@cluster0-umlrs.mongodb.net/wedev?retryWrites=true&w=majority',
{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).catch(error => handleError(error));

mongoose.connection.once('open',()=>{
  console.log('database connect')
})

app.listen('3001', function () {
  console.log('Express server listening on port 3001' )
})