const User = require('./users.model');
const Location = require("../locations/locations.model");
const usersLocal = require('../auth/local.strategy')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function findAll () {
    try {
        const response = await User.find().select('-password');
        return response;
    } catch (err) {
        console.log("Cet utilisateur n'existe pas");
        console.log(err);
    }
}
async function userMe(id) {
    try {
        const response = await User.findOne({_id:id}).select('-password');
        return response;
    } catch (err) {
        return "User not exists";
        console.log(err);
    }
}
async function deleteUserMe(id) {
    try {
        const response = await User.findOneAndDelete({_id: id}).select('-password');
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}
async function register(user) {
    try {
        const hashedPwd = await bcrypt.hash(user.password, saltRounds)
        console.log(hashedPwd);
        return await User.create({username:user.username, password:hashedPwd});
    } catch (err) {
        console.log(err);
        return null;
    }
}
async function updateUserMe(id, newProperty){
    try {
        const response = await User.findOneAndUpdate({_id: id}, newProperty).select('-password');
        return response;

    } catch (err) {
        console.log(err);
        return null
    }
}

async function generateJwt(user){
    try {
        return jwt.sign({sub:user._id.toString()}, process.env.JWTSECRET)
    } catch (err) {
        return "Error jwt generation."
    }
}

module.exports = {
    findAll,
    userMe,
    register,
    deleteUserMe,
    updateUserMe,
    generateJwt
}