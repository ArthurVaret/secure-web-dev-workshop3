const router = require('express').Router()
const usersService = require('./users.service')
const locationsService = require("../locations/locations.service");

router.post('/users/register', async (req, res) => {
    return res.status(200).send({users: await usersService.addUser(req.body)})
})
router.post('/users/login', async (req, res) => {
    return res.status(200).send({users: await usersService.loginUser(req.body)})
})
router.get('/users/me', async (req, res) => {
    return res.status(200).send({users: await usersService.userMe()})
})
router.get('/users', async (req, res) => {
    return res.status(200).send({users: await usersService.findAll()})
})
router.delete('/users/me', async (req, res) => {
    return res.status(200).send({users: await usersService.deleteUserMe(req.params)})
})
router.put('/users/me', async (req, res) => {
    return res.status(200).send({users: await usersService.updateUserMe(req.params, req.body)})
})
module.exports = router