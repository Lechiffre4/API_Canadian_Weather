const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @swagger
 * /api/currentweather/{region}/{citycode}:
 *   get:
 *     summary: Get weather information by region and city code.
 *     description: Retrieve weather information for a specific city in a given region.
 *     parameters:
 *       - name: region
 *         description: The region code.
 *         in: path
 *         required: true
 *         type: string
 *       - name: citycode
 *         description: The city code.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Weather information retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "City": "Example City",
 *                 "TempMetric": 22.5,
 *                 "TempImperial": 72.5,
 *                 "humidity": 60.5,
 *                 "iconURL": "https://example.com/weathericons/sunny.gif",
 *                 "timeStamp": "2023-11-11T12:34:56.789Z",
 *                 "WindSpeedMetric": 15.5,
 *                 "WindSpeedImperial": 10.5,
 *                 "WindDirection": "N"
 *               }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Erreur lors de la récupération des données météo"
 *               }
 */
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
