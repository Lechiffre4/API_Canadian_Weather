const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/**
 * @swagger
 * /api/weather/{region}/{citycode}:
 *   get:
 *     summary: Get raw information by region and city code.
 *     description: Retrieve raw weather information for a specific city in a given region.
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
 *         description: Raw weather information retrieved successfully.
 *         content:
 *           application/json:
 *             example: |
 *               {
 *                 "timeStamp": "2023-11-11T12:34:56.789Z",
 *                 "observation": {
 *                   "temperature": {
 *                     "metricUnrounded": 22.5,
 *                     "imperialUnrounded": 72.5
 *                   },
 *                   "humidity": 60.5,
 *                   "iconCode": "sunny",
 *                   "windSpeed": {
 *                     "metric": 15.5,
 *                     "imperial": 10.5
 *                   },
 *                   "windDirection": "N"
 *                 },
 *                 "displayName": "Example City"
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
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des données météo" });
	}
});

module.exports = router;
