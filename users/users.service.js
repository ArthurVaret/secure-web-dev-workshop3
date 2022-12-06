const User = require('./users.model');
const Location = require("../locations/locations.model");
const usersLocal = require('../auth/local.strategy')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function findAll () {
    try {
        const response = await User.find();
        return response;
    } catch (err) {
        console.log("Cet utilisateur n'existe pas");
        console.log(err);
    }
}
async function userMe(id) {
    try {
        const response = await User.findOne({_id:id});
        return response;
    } catch (err) {
        return "User not exists";
        console.log(err);
    }
}
async function deleteUserMe(username) {
    try {
        await User.findOneAndDelete({username:username});
        return "Bien supprimé";
    } catch (err) {
        return "Cet utilisateur n'existe pas";
        console.log(err);
    }
}
async function addUser(user) {
    try {
        const hashedPwd = await bcrypt.hash(user.password, saltRounds)
        //console.log(hashedPwd);
        return await User.create({username:user.username, password:hashedPwd});
    } catch (err) {
        console.log("on est dans l'erreur")
        console.log(err);
        return null;
    }
}
async function updateUserMe(username, newProperty){
    try {
        await User.findOneAndUpdate({username:username}, newProperty);
        return "L'utilisateur a bien été modifié";

    } catch (err) {
        return "An error occured while updating an user...";
        console.log(err);
    }
}
async function loginUser(user) {
    try {
        const userData = await User.findOne({username:user.username});
        const bool = await bcrypt.compare(user.password, userData.password);
        if (bool) {
            return userData;
        }
        else {
            return null;
        }
        //return "Vous êtes connecté";
    } catch (err) {
        console.log(err);
        return null;
    }
}
async function generateJwt(user){
    try {
        //console.log(user._id.toString())
        console.log(jwt.sign(user._id.toString(), process.env.JWTSECRET));
        return jwt.sign(user._id.toString(), process.env.JWTSECRET)
    } catch (err) {
        return "Error jwt generation."
    }
}

module.exports = {
    findAll,
    userMe,
    addUser,
    deleteUserMe,
    updateUserMe,
    loginUser,
    generateJwt
}