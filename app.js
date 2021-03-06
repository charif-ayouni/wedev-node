const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use (cookieParser ());

/* Database */
/*require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.set('useCreateIndex', true);
mongoose.connect(DATABASE_URL,
{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
).catch(err=>console.log(err));

/!* Routes *!/
const User        = require('./routes/User');
const Project     = require('./routes/Project');
const Customer    = require('./routes/Customer');
const Sprint      = require('./routes/Sprint');
const Task        = require('./routes/Task');*/
const Api         = require('./routes/Api');

/*app.use('/api/v1/user', User);
app.use('/api/v1/project',Project);
app.use('/api/v1/customer',Customer);
app.use('/api/v1/sprint',Sprint);
app.use('/api/v1/task',Task);*/
app.use('/api/v1/api',Api);

let server_port = process.env.YOUR_PORT || process.env.PORT || 80;
let server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function () {
  console.log('Express server listening on port 80' )
});
