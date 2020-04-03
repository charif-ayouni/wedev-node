const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ ';
require('mongoose-type-email');

const CustomerSchema = new Schema({
    address : {
        type : String,
        required : [true,(Error + 'adresse')]
    },
    firstname : {
        type : String,
        required : [true,(Error + 'npm')]
    },
    lastname : {
        type : String,
        required : [true,(Error + 'prenom')]
    },
    phone : {
        type : String,
        required : [true,(Error + 'téléphone')]
    },
    email :{ 
        type : mongoose.SchemaTypes.Email,
        required : [true,(Error + 'email')],
        unique: true
        },
    projects : [{type: Schema.Types.ObjectId, ref: 'Project'}]
})
module.exports = mongoose.model('Customer',CustomerSchema);