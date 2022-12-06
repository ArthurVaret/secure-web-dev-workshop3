const router = require('express').Router()
const usersService = require('./users.service')
const localStrategy = require('../auth/local.strategy')
const jwtStrategy = require('../auth/jwt.strategy')


router.post('/users/register', async (req, res) => {
    const user = await usersService.register(req.body)
    console.log(user);
    if (user == null)
        return res.status(404).send({err: "User already exists."});
    else
        return res.status(200).send({users: user});
})
router.post('/users/login', async (req, res) => {
    const user = await usersService.loginUser(req.body);
    console.log(user);
    if (user) {
        return res.status(200).send({mess: "Connected", username: req.body.username, jwt: await usersService.generateJwt(user)});
    }
    else
        return res.status(403).send({err: "Incorrect username or password."});
})

router.route('/users/me')
    .get(async (req, res) => {
        console.log(req.headers['authorization'].split(' ')[1]);
        const id = await jwtStrategy.userJwt(req.headers['authorization'].split(' ')[1]);
        const user = await usersService.userMe(id);
        console.log(user);
        if (user) {
            return res.status(200).send({mess: "You are registered as", user: user});
        }
        else
            return res.status(403).send({err: "Unauthorized"});
    })
    .delete(async (req, res) => {
        console.log(req.headers['authorization'].split(' ')[1]);
        const id = await jwtStrategy.userJwt(req.headers['authorization'].split(' ')[1]);
        const user = await usersService.deleteUserMe(id);
        console.log(user);
        if (user) {
            return res.status(200).send({mess: "User deleted", user: user});
        }
        else
            return res.status(403).send({err: "Unauthorized"});
    })
    .put(async (req, res) => {
        console.log(req.headers['authorization'].split(' ')[1]);
        const id = await jwtStrategy.userJwt(req.headers['authorization'].split(' ')[1]);
        const user = await usersService.updateUserMe(id, req.body);
        console.log(user);
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