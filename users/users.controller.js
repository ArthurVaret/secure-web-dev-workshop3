const router = require('express').Router()
const usersService = require('./users.service')
const localStrategy = require('../auth/local.strategy')
const jwtStrategy = require('../auth/jwt.strategy')
var passport = require('passport')

router.post('/users/register', async (req, res) => {
    const user = await usersService.register(req.body);
    if (user == null)
        return res.status(404).send({err: "User already exists."});
    else
        return res.status(200).send({user: user.username});
})
router.use('/users/login', passport.authenticate('local', {session: false}));
router.post( '/users/login',async (req, res) => {
    if (req.user) {
        return res.status(200).send({mess: "Connected", username: req.body.username, jwt: await usersService.generateJwt(req.user)});
    }
    else
        return res.status(403).send({err: "Incorrect username or password."});
})

router.use('/users/me', (passport.authenticate('jwt', {session: false})));
router.route('/users/me')
    .get(async (req, res) => {
        if (req.user) {
            return res.status(200).send({mess: "You are registered as", user: req.user});
        }
        else
            return res.status(403).send({err: "Unauthorized"});
    })
    .delete(async (req, res) => {
        const user = await usersService.deleteUserMe(req.user._id);
        console.log(user);
        if (user) {
            return res.status(200).send({mess: "User deleted", user: user});
        }
        else
            return res.status(403).send({err: "Unauthorized"});
    })
    .put(async (req, res) => {
        const user = await usersService.updateUserMe(req.user._id, req.body);
        if (user) {
            return res.status(200).send({mess: "User updated", user: user});
        }
        else
            return res.status(403).send({err: "Unauthorized"});
    })
router.get('/users', async (req, res) => {
    return res.status(200).send({users: (await usersService.findAll())})
})

module.exports = router