const jwt = require('jsonwebtoken')

async function userJwt (token) {
    try {
        //var decoded = jwt.verify(token, 'shhhhh');
        console.log(jwt.verify(token, process.env.JWTSECRET));
        return jwt.verify(token, process.env.JWTSECRET)
    } catch (err){
        console.log("on est dans l'erreur.")
        console.log(err);
        return null
    }
}

module.exports = {
    userJwt
}