const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get("/", async (req, res) => {
	res.json({'INFO':'You must precis the region and the city code to get current weather data about a city. Exemple: For montréal the endpoint is (/raw_data/QC/147)'})
});

router.get("/:region/:citycode", async (req, res) => {
	const citycode = req.params["citycode"];
	const region = req.params["region"];
	const apiUrl = `https://meteo.gc.ca/api/app/fr/Location/${region}-${citycode}/`;

	try {
		const response = await fetch(apiUrl);
		const rawdata = await response.json();

		let City = rawdata[0]["displayName"];
		let TempMetric = parseFloat(
			rawdata[0]["observation"]["temperature"]["metricUnrounded"]
		);
		let TempImperial = parseFloat(
			rawdata[0]["observation"]["temperature"]["imperialUnrounded"]
		);
		let humidity = parseFloat(rawdata[0]["observation"]["humidity"]);
		let icon = rawdata[0]["observation"]["iconCode"];
		let iconURL = `https://meteo.gc.ca/weathericons/${icon}.gif`
		let timeStamp = Date(rawdata[0]["observation"]["timeStamp"]);

		let WindSpeedMetric = parseFloat(
			rawdata[0]["observation"]["windSpeed"]["metric"]
		);
		let WindSpeedImperial = parseFloat(
			rawdata[0]["observation"]["windSpeed"]["imperial"]
		);
		let WindDirection = rawdata[0]["observation"]["windDirection"];

		const data = {
			"City": City,
			"TempMetric": TempMetric,
			"TempImperial": TempImperial,
			"humidity": humidity,
			"iconURL": iconURL,
			"timeStamp": timeStamp,
			"WindSpeedMetric": WindSpeedMetric,
			"WindSpeedImperial": WindSpeedImperial,
			"WindDirection": WindDirection
		};

		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des données météo" });
	}
});

module.exports = router;
