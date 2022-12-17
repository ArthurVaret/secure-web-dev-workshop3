const jwt = require('jsonwebtoken')
const passport = require("passport");
const stream = require("stream");
const {Strategy} = require("passport-jwt");
const usersService = require("../users/users.service");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//verification of token as proof of identity
passport.use( new Strategy({
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async function (payload, done) {
        try {
            console.log(payload);
            const user = await usersService.userMe(payload.sub);
            if (!user) {
                return done(null,false);
            }
            return done(null,user);
        } catch (err){
            console.log(err);
            return done(err,false)
        }
    }
) );

module.exports = {
    passport
}