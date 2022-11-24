const User = require('./users.model');
const Location = require("../locations/locations.model");

async function findAll () {
    try {
        const response = await User.find();
        return response;
    } catch (err) {
        console.log("Cet utilisateur n'existe pas");
        console.log(err);
    }
}
async function userMe(username) {
    try {
        const response = await User.findOne({username:username});
        return response;
    } catch (err) {
        return "Cet utilisateur n'existe pas";
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
        await User.create(user);
        return "L'utilisateur a bien été ajouté";
    } catch (err) {
        console.log(err);
        return "An error occured";
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
        await User.findOne(user);
        return "L'utilisateur a bien été ajouté";
    } catch (err) {
        console.log(err);
        return "An error occured";
    }
}
module.exports = {
    findAll,
    userMe,
    loginUser,
    addUser,
    deleteUserMe,
    updateUserMe,


}