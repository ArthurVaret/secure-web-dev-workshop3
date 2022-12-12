const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require("passport");
const localStrategy = require('../auth/local.strategy')
const jwtStrategy = require('../auth/jwt.strategy')
const {roleMiddleware} = require("../auth/authRoles");

router.use('/locations', (passport.authenticate('jwt', {session: false})));
router.route('/locations/:id')
	.get(async (req, res) => {
		const loc = await locationsService.locationById(req.params.id)
		if (loc) {
			return res.status(200).send({location: loc})
		}
		else
			return res.status(404).send({err: "No such location."})
	})
	.delete(roleMiddleware(['admin']), async (req, res) => {
		const loc = await locationsService.deleteLocationById(req.params.id)
		if (loc) {
			return res.status(200).send({location: loc})
		}
		else
			return res.status(404).send({err: "Deletion failed."})
	})
	.put(roleMiddleware(['admin']), async (req, res) => {
		const loc = await locationsService.updateLocation(req.params.id, req.body)
		if (loc) {
			return res.status(200).send({location: loc})
		}
		else
			return res.status(404).send({err: "Update failed."})
	})
router.route('/locations')
	.get(async (req, res) => {
		const locs = await locationsService.findAll()
		if (locs) {
			return res.status(200).send({locations: locs})
		}
		else
			return res.status(404).send({err: "An error occurred."})
	})
	.post(roleMiddleware(['admin']), async (req, res) => {
		const loc = await locationsService.addLocation(req.body)
		if (loc) {
			return res.status(200).send({location: loc})
		}
		else
			return res.status(404).send({err: "An error occurred."})
	})
router.get('/test',(request,response) => {
	return response.status(200).send("Hello World");
});

module.exports = router
