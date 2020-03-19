const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Error = 'Veuillez remplir le champ '
require('mongoose-type-email');

const UserSchema = new Schema({
        firstname : {
                type : String,
                required : [true, ( Error + 'nom' )]
        },
        lastname : {
            type : String,
            required : [true,( Error + 'prenom' )]
        },
        company : {
            type : String,
            required : [true,( Error + 'societé' )]
        },
        siret : {
            type : String,
            required : [true,( Error + 'siret' )]
        },
        email :{ 
            type: mongoose.SchemaTypes.Email,
            required : [true,( Error + 'email' )],
            unique: true
        },  
        password :{ 
            type: String,
            required : [true,( Error + 'password' )],
        },
        phone :{ 
            type : Number,
            required : [true,( Error + 'téléphone' )],
            unique: true
        },
        company_statut :{ 
            type : String,
            enum : ['SAS','SASU','autoentrepreneur','EURL','SARL'],
            required : [true,( Error + 'statut de société' )]
        },
        profile :{ 
            type : String,
            enum : ['développeur Back','développeur Front','Data Analyst','QA'],
            required : [true,( Error + 'profil' )]
        },

        projects : [{type: Schema.Types.ObjectId, ref: 'Project'}]

 })
module.exports = mongoose.model('User',UserSchema);