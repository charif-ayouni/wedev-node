const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ '
const SprintSchema = new Schema({
    title : {
        type : String,
        required : [true, ( Error + 'Titre' ) ]
    },
    start_date : {
        type : Date,
        required : [true,( Error + 'Une date de début' )]
    },
    end_date : {
        type : Date,
        required : [true,( Error + 'date de fin' )]
    },
    status :{
        type : String,
        enum : ['TO_DO','IN_PROGRESS','DONE'],
        required : [true,( Error + 'statut' )]
    },
    project : { 
        type: Schema.Types.ObjectId, 
        ref: 'Project',
        require:[true,( Error + 'projet' )]
    }

 });
module.exports = mongoose.model('Sprint',SprintSchema);