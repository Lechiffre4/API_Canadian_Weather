const express = require('express');
const cities = require("../data/citycodes.json");

const router = express.Router();

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