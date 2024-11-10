const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

adminSchema.statics.login = async function(userName, password) {
    const admin = await this.findOne({userName});
    if(admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if(auth) {
            return admin;
        }
        throw Error('Incorrect password');
        
    }
    throw Error ('Incorrect userName or password');
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

/*
Abdo8585@
Albara8585@
Musab8585@
Ahmed8585@
Fatima8585@
Aya8585@
*/