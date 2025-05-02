const axios = require('axios');

const NASA_API_KEY = 'DEMO_KEY'; 
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

const getAPOD = async () => {
    try {
        const response = await axios.get(APOD_URL);
        return {
            title: response.data.title,
            explanation: response.data.explanation,
            date: response.data.date,
            imageUrl: response.data.url,
        };
    } catch (error) {
        console.error('Error fetching APOD:', error);
        throw new Error('Could not retrieve Astronomy Picture of the Day');
    }
};

module.exports = { getAPOD };