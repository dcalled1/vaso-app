const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const {Schema} = mongoose;

const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true}
});

User.methods.encrypt = async (password) => {
    let salt = await bcrypt.genSalt(3);
    let hash = bcrypt.hash(password, salt)
    return hash;
};

User.methods.match = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', User)