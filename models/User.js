const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
require('mongoose-type-email');

const saltRounds = 10;
const Error = 'Veuillez remplir le champ ';


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

        projects : [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            }
        ],
        customers : [
            {
                type: Schema.Types.ObjectId,
                ref: 'Customer'
            }
        ]

 });

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

module.exports = mongoose.model('User',UserSchema);