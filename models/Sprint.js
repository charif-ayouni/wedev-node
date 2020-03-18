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
    statut :{
        type : String,
        enum : ['to do','in progress','realized'],
        required : [true,( Error + 'status' )]
    },
    tasks : [
        { 
            title : { 
                type:String,
                require:[true,( Error + 'titre' )]
            },
            description :{ 
                type:String,
                require:[true,( Error + 'description' )]
            },
            statut : {
                type:String,
                enum : ['to do', 'in progress','realized'],
                require:[true,( Error + 'status' )]
            },
            time_realization : {
                type:Number,
                require:[true,( Error + 'temps de réalisation' )]
            }  
        }
    ],
    project : { 
        type: Schema.Types.ObjectId, 
        ref: 'Project',
        require:[true,( Error + 'projet' )]
    }

 })
module.exports = mongoose.model('Sprint',SprintSchema);