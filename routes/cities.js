const express = require('express');
const cities = require("../data/citycodes.json");


const router = express.Router();

/**
 * @swagger
 * /api/cities/:
 *   get:
 *     description: return all the cities with their id in each region.
 *     responses:
 *       200:
 *         description: get all the cities data
 */
router.get("/", async (req, res) => {
	try {
        res.json(cities)
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/cities/{region}:
 *   get:
 *     description: Return all the cities with their id in a specific region.
 *     parameters:
 *       - name: region
 *         description: The 2-letter abbreviation of the region.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get all the cities data for the specified region.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "City1": "ID1",
 *                 "City2": "ID2",
 *                 // ... other cities
 *               }
 *       404:
 *         description: Region not found.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Region not found"
 *               }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Internal Server Error"
 *               }
 */
router.get("/:region", async (req, res) => {
	const region = req.params["region"].toUpperCase();
	try {
        const regionData = cities[region];
        if (regionData) {
            res.json(regionData);
        } else {
            res.status(404).json({ error: "Region not found" });
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
