import { getAPOD } from '../src/services/nasaService';
import axios from 'axios';

jest.mock('axios');

describe('NASA APOD Service', () => {
    const mockData = {
        date: '2023-10-01',
        explanation: 'A beautiful view of the cosmos.',
        title: 'Cosmic Wonders',
        url: 'https://example.com/image.jpg',
    };

    it('should fetch the Astronomy Picture of the Day successfully', async () => {
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getAPOD();

        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    });

    it('should handle errors when fetching the APOD', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(getAPOD()).rejects.toThrow(errorMessage);
    });
});