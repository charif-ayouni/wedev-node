const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ '

const ProjectSchema = new Schema({
   title :{
        type : String,
        required: [true, (Error + 'titre')]
    },
   amount : {
         type : Number,
          required: [true, (Error + 'montant')]
    },
    deadlines_realization :{
              type : Number,
              required: [true, (Error + 'délais de réalisation')]
   },
   start_date : {
             type : Date,
             required: [true, (Error + 'de de debut')]
   },
   end_date : {
             type : Date,
             required: [true,(Error + 'date de fin')]
   },
   Statut : {
             type : String,
             enum : ['en cours','réalisé'],
             required: [true, (Error + 'cstatus')]
   },
   Cost_day :{
             type : Number,
             required: [true, (Error + 'cout par jour')]
   },
   stacks : [
       {
            type : String,
            required: [true, (Error + 'stack')]     
        }
   ],
   costumer : { type: Schema.Types.ObjectId, ref: 'Customer' },
   user :  { type: Schema.Types.ObjectId, ref: 'User' },
   sprints : [{type: Schema.Types.ObjectId, ref: 'Sprint' }],   
 
})
module.exports = mongoose.model('Project',ProjectSchema);