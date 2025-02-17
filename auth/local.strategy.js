const { Strategy } = require('passport-local');
const User = require("../users/users.model");
const bcrypt = require("bcrypt");
const passport = require("passport");

//function to log in with passport
passport.use(new Strategy(async function (username, password, done) {
    try {
        const user = await User.findOne({username:username});
        const bool = await bcrypt.compare(password, user.password);
        if (!user || !bool) {
            return done(null, false)
        }
        return done(null, user)
    } catch (err) {
        console.log(err);
        return done(err,false)
    }
}));

module.exports = {
    passport
}