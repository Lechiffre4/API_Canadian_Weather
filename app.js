const express = require('express');
const cors = require('cors')

const { notFound, errorHandler } = require('./middlewares');

/* Express Setup */

const app = express();
app.use(express.json());
app.use(cors());

/* Default route */

app.get("/", async (req, res) => {
  return res.status(200).json({
    title: "Bienvenue",
    message: "Bienvenue sur mon serveur proxy gratuit de météo canada ! ",
  });
});


/* Routes */
const raw_data = require('./routes/raw_data');
app.use('/api/raw_data', raw_data);

const currentweather = require('./routes/currentweather');
app.use('/api/currentweather', currentweather);



/*  Error 404 */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
