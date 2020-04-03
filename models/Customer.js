const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ ';
require('mongoose-type-email');

const CustomerSchema = new Schema({
    corporate_name : {
        type : String,
        required : [true,(Error + 'dénomination sociale')]
    },
    address : {
        type : String,
        required : [true,(Error + 'adresse')]
    },
    contact_firstname : {
        type : String,
        required : [true,(Error + 'npm')]
    },
    contact_lastname : {
        type : String,
        required : [true,(Error + 'prenom')]
    },
    contact_phone : {
        type : String,
        required : [true,(Error + 'téléphone')]
    },
    contact_email :{
        type : mongoose.SchemaTypes.Email,
        required : [true,(Error + 'email')]
    },
    projects : [{type: Schema.Types.ObjectId, ref: 'Project'}]
});
module.exports = mongoose.model('Customer',CustomerSchema);