// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	try {
		const response = await Location.find();
		return response;
	} catch (err) {
		console.log("Cette location n'existe pas");
		console.log(err);
	}
}

async function locationById(id) {
	try {
		const response = await Location.findOne({_id:id});
		return response;
	} catch (err) {
		return "Cette location n'existe pas";
		console.log(err);
	}
}

async function deleteLocationById(id) {
	try {
		await Location.findOneAndDelete({_id:id});
		return "Bien supprimé";
	} catch (err) {
		return "Cette location n'existe pas";
		console.log(err);
	}
}

async function addLocation(location) {
	try {
		await Location.create(location);
		return "La location a bien été ajouté";
	} catch (err) {
		console.log(err);
		return "An error occured";
	}

}

async function updateLocation(id, newProperty){
	try {
		await Location.findOneAndUpdate({_id:id}, newProperty);
		return "Location updated ! ";

	} catch (err) {
		return "An error occured while updating a location...";
		console.log(err);
	}
}

module.exports = {
	findAll,
	locationById,
	addLocation,
	deleteLocationById,
	updateLocation

}

