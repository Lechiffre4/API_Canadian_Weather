import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 5000;

app.use(express.json());

app.get("/weather/:type", async (req, res) => {
  const { type } = req.params;
  const apiUrl = `https://meteo.gc.ca/api/app/fr/Location/QC-147?type=${type}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données météo" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});