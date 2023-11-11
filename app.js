const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { notFound, errorHandler } = require('./middlewares');

/* Express Setup */

const app = express();
app.use(express.json());
app.use(cors());

/* Swagger UI Setup */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Canadian Weather API",
      version: '1.0.0',
    },
  },
  apis: ["app.js", "./routes/cities.js", "./routes/city.js", "./routes/currentweather.js", "./routes/raw_data.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* Default route */
/**
 * @swagger
 * /api/:
 *   get:
 *     description: Welcome to the api
 *     responses:
 *       200:
 *         description: Success
 * 
 */
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

const cities = require('./routes/cities');
app.use('/api/cities', cities);

const city = require('./routes/city');
app.use('/api/city', city);



/*  Error 404 */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
