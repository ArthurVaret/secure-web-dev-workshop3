const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User