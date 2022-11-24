const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(locationController)

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
