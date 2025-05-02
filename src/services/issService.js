import fetch from 'node-fetch';

const ISS_API_URL = 'http://api.open-notify.org/iss-now.json';

export const getCurrentLocation = async () => {
    try {
        const response = await fetch(ISS_API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching ISS location: ${response.statusText}`);
        }
        const data = await response.json();
        return {
            latitude: data.iss_position.latitude,
            longitude: data.iss_position.longitude,
            timestamp: new Date(data.timestamp * 1000).toLocaleString()
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve ISS location');
    }
};

export const startPolling = (callback) => {
    const intervalId = setInterval(async () => {
        try {
            const location = await getCurrentLocation();
            callback(location);
        } catch (error) {
            console.error(error);
        }
    }, 10000);

    return () => clearInterval(intervalId); 
};