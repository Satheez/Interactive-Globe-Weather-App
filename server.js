const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Updated weather route using WeatherAPI.com
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHERAPI_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: apiKey,
        q: `${lat},${lon}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      'Error fetching weather data:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
