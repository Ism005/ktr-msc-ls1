const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) throw new Error('Email non valide');
        }
    },
    phone: {
        type: String,
        required: true,
        validate(v) {
            if (!validator.isMobilePhone(v)) throw new Error('Numéro non valide');
        }
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
});



userSchema.methods.generateAuthTokenAndSaveUser = async function() {
    const authToken = jwt.sign({_id: this._id.toString() },'fool');
    if (this.authTokens.length > 0) {
        this.authTokens = []
    }
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;
}

userSchema.statics.findUser = async (email, password) => {
    const userr = await User.findOne({ email });
    if (!userr) throw new Error('Pas possible de se connecter');
    const isPasswordValid = await bcrypt.compare(password, userr.password);
    if (!isPasswordValid) throw new Error('Pas possible de se connecter');
    return userr;
};

userSchema.pre('save', async function(){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model( 'User', userSchema );

//const firstSave = firstPerson.save();
//console.log(firstPerson);

module.exports = User;