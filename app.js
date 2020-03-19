const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRouter = require('./routes/User');
const ProjectRouter = require('./routes/Project');
const CostomerRouter = require('./routes/Customer');
const SprintRouter = require('./routes/Sprint')
app.use(express.json());
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://wedev:wedev@graphql-bqso0.mongodb.net/wedev?retryWrites=true&w=majority',
{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
).catch(err=>console.log(err))


app.use(UserRouter);
app.use(ProjectRouter);
app.use(CostomerRouter);
app.use(SprintRouter);
app.listen('3001', function () {
  console.log('Express server listening on port 3001' )
})