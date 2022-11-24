// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')


router.get('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})
router.get('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.locationById(req.params.id)})
})
router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.deleteLocationById(req.params.id)})
})
router.put('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.updateLocation(req.params.id, req.body)})
})
router.post('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.addLocation(req.body)})
})
router.get('/test',(request,response) => {
	return response.status(200).send("Hello World");
});

module.exports = router
