// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	try {
		const response = await Location.find();
		return response;
	} catch (err) {
		console.log(err);
		return null
	}
}

async function locationById(id) {
	try {
		const response = await Location.findOne({_id:id});
		return response;
	} catch (err) {
		console.log(err);
		return null
	}
}

async function deleteLocationById(id) {
	try {
		return await Location.findOneAndDelete({_id:id});
	} catch (err) {
		console.log(err);
		return null
	}
}

async function addLocation(location) {
	try {
		return await Location.create(location);
	} catch (err) {
		console.log(err);
		return null
	}

}

async function updateLocation(id, newProperty){
	try {
		return Location.findOneAndUpdate({_id:id}, newProperty);
	} catch (err) {
		console.log(err);
		return null
	}
}

module.exports = {
	findAll,
	locationById,
	addLocation,
	deleteLocationById,
	updateLocation

}

