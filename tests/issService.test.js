import { getCurrentLocation, startPolling } from '../src/services/issService';

describe('ISS Service', () => {
    describe('getCurrentLocation', () => {
        it('should return the current location of the ISS', async () => {
            const location = await getCurrentLocation();
            expect(location).toHaveProperty('latitude');
            expect(location).toHaveProperty('longitude');
        });

        it('should throw an error when the API call fails', async () => {
            // Mocking the fetchData function to simulate an error
            jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('API call failed')));

            await expect(getCurrentLocation()).rejects.toThrow('API call failed');
        });
    });

    describe('startPolling', () => {
        it('should log the current location every 10 seconds', async () => {
            jest.useFakeTimers();
            const logSpy = jest.spyOn(console, 'log').mockImplementation();

            startPolling();

            jest.advanceTimersByTime(10000); // Fast-forward 10 seconds

            expect(logSpy).toHaveBeenCalled();
            expect(logSpy.mock.calls[0][0]).toMatch(/Current ISS location:/);

            logSpy.mockRestore();
            jest.useRealTimers();
        });
    });
});