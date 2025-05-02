import { getAPOD } from './services/nasaService.js';
const inquirer = require('inquirer');
const issService = require('./services/issService');
const launchService = require('./services/launchService');

async function main() {
    console.log("Welcome to the Space Explorer CLI!");

    const { feature } = await inquirer.prompt([
        {
            type: 'list',
            name: 'feature',
            message: 'Select a feature to explore:',
            choices: ['Astronomy Picture of the Day', 'ISS Location Tracker', 'Upcoming Launches', 'Exit']
        }
    ]);

    switch (feature) {
        case 'Astronomy Picture of the Day':
            await displayAPOD();
            break;
        case 'ISS Location Tracker':
            await trackISSLocation();
            break;
        case 'Upcoming Launches':
            await displayUpcomingLaunches();
            break;
        case 'Exit':
            console.log("Exiting the application. Goodbye!");
            process.exit();
    }

    main(); // Restart the main function for another interaction
}

async function displayAPOD() {
    try {
        const apodData = await getAPOD();
        console.log(`Title: ${apodData.title}`);
        console.log(`Date: ${apodData.date}`);
        console.log(`Explanation: ${apodData.explanation}`);
        console.log(`Image URL: ${apodData.url}`);
    } catch (error) {
        console.error("Error fetching Astronomy Picture of the Day:", error.message);
    }
}

async function trackISSLocation() {
    try {
        await issService.startPolling();
    } catch (error) {
        console.error("Error tracking ISS location:", error.message);
    }
}

async function displayUpcomingLaunches() {
    try {
        const launches = await launchService.getUpcomingLaunches();
        if (launches.length === 0) {
            console.log("No upcoming launches found.");
        } else {
            launches.forEach(launch => {
                console.log(`Mission: ${launch.name}, Vehicle: ${launch.rocket.name}, Launch Date: ${launch.window_start}`);
            });
        }
    } catch (error) {
        console.error("Error fetching upcoming launches:", error.message);
    }
}

main();