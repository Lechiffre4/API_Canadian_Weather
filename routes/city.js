const express = require('express');
const cities = require("../data/citycodes.json");

const router = express.Router();

/**
 * @swagger
 * /api/city/{region}/{citycode}:
 *   get:
 *     summary: Get city information by region and city code.
 *     description: Return the name of the city based on the region and city code.
 *     parameters:
 *       - name: region
 *         description: The 2-letter abbreviation of the region.
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         description: The city code of the city.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: City information retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "region": "AB",
 *                 "id": "17",
 *                 "cityName": "Crowsnest"
 *               }
 *       404:
 *         description: City or Region not found.
 *         content:
 *           application/json:
 *             examples:
 *               cityNotFound:
 *                 value:
 *                   {
 *                     "error": "City not found in the specified region"
 *                   }
 *               regionNotFound:
 *                 value:
 *                   {
 *                     "error": "Region not found"
 *                   }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Internal Server Error"
 *               }
 */
router.get("/:region/:id", async (req, res) => {
    const region = req.params["region"].toUpperCase();
    const id = req.params["id"];
    
    try {
        // Assurez-vous que la région existe dans vos données
        if (cities[region]) {
            const citiesInRegion = cities[region];

            // Parcourir les villes de la région
            for (const city in citiesInRegion) {
                if (citiesInRegion[city] === id) {
                    // Si une correspondance est trouvée, renvoyer le nom de la ville
                    res.json({ region: region, id: id, cityName: city });
                    return;
                }
            }

            // Si aucune correspondance n'est trouvée
            res.status(404).json({ error: "ID not found in the specified region" });
        } else {
            // Si la région n'existe pas dans vos données
            res.status(404).json({ error: "Region not found" });
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;