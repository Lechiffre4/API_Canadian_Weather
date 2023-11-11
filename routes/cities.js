const express = require('express');
const cities = require("../data/citycodes.json");


const router = express.Router();

router.get("/", async (req, res) => {
	try {
        res.json(cities)
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:region", async (req, res) => {
	const region = req.params["region"];
	try {
        res.json(cities[region.toUpperCase()])
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
