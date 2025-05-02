import { fetchData } from '../utils/apiClient';

const LAUNCH_LIBRARY_API_URL = 'https://llapi.thespacedevs.com/2.2.0/launch/upcoming/';

export const getUpcomingLaunches = async (status = '', date = '') => {
    try {
        const url = new URL(LAUNCH_LIBRARY_API_URL);
        if (status) url.searchParams.append('status', status);
        if (date) url.searchParams.append('window_start__gte', date);

        const data = await fetchData(url.toString());
        if (data.count === 0) {
            return 'No upcoming launches found.';
        }

        return data.results.map(launch => ({
            missionName: launch.name,
            vehicle: launch.rocket.name,
            launchDate: launch.window_start,
        }));
    } catch (error) {
        throw new Error(`Failed to fetch upcoming launches: ${error.message}`);
    }
};