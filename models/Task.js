const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ ';

const TaskSchema = new Schema({
    title : {
        type:String,
        require:[true,( Error + 'titre' )]
    },
    description :{
        type:String,
        require:[true,( Error + 'description' )]
    },
    time_realization : {
        type:Number,
        require:[true,( Error + 'temps de réalisation' )]
    },
    status : {
        type:String,
        enum : ['TO_DO', 'IN_PROGRESS','DONE'],
        require:[true,( Error + 'statut' )]
    },
    priority : {
        type:String,
        enum : [null, 'HIGH', 'MEDIUM','LOW']
    },
    order : {
        type:Number,
    },
    sprint : {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
        require:[true,( Error + 'sprint' )]
    }
});
module.exports = mongoose.model('Task',TaskSchema);