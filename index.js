const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const usersLocal = require('./auth/local.strategy')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(locationController)
app.use(userController)

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
