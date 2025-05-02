import { getUpcomingLaunches } from '../src/services/launchService';

describe('Launch Service', () => {
    it('should fetch upcoming launches successfully', async () => {
        const launches = await getUpcomingLaunches();
        expect(Array.isArray(launches)).toBe(true);
        expect(launches.length).toBeGreaterThan(0);
        launches.forEach(launch => {
            expect(launch).toHaveProperty('name');
            expect(launch).toHaveProperty('rocket');
            expect(launch).toHaveProperty('window_start');
        });
    });

    it('should filter launches by status', async () => {
        const launches = await getUpcomingLaunches({ status: 'upcoming' });
        expect(Array.isArray(launches)).toBe(true);
        launches.forEach(launch => {
            expect(launch.status).toBe('upcoming');
        });
    });

    it('should filter launches by date', async () => {
        const date = '2023-10-01'; // Example date
        const launches = await getUpcomingLaunches({ date });
        expect(Array.isArray(launches)).toBe(true);
        launches.forEach(launch => {
            expect(launch.window_start).toContain(date);
        });
    });

    it('should return a fallback message if no launches are found', async () => {
        const launches = await getUpcomingLaunches({ status: 'unknown' });
        expect(launches).toEqual([]);
    });
});