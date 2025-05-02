# Space Explorer

## Overview
Space Explorer is a Node.js command-line application that integrates with various space-related APIs to provide users with real-time and historical data about space exploration. The application features the Astronomy Picture of the Day from NASA, the current location of the International Space Station, and information about upcoming space launches.

## Features
- **Astronomy Picture of the Day**: Fetches and displays the current day's image, title, explanation, and date from the NASA APOD API.
- **ISS Location Tracker**: Retrieves and displays the current latitude and longitude of the International Space Station, refreshing every 10 seconds.
- **Upcoming Launches**: Provides a list of upcoming space launches, including mission names, vehicles, and launch dates, with filtering options.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd space-explorer
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To run the application, execute the following command:
```
node src/app.js
```

## Examples
- **Astronomy Picture of the Day**: Displays the image, title, explanation, and date.
- **ISS Location**: Shows the current location of the ISS with a timestamp.
- **Upcoming Launches**: Lists upcoming launches with options to filter by status or date.

## Testing
To run the tests, use the following command:
```
npm test
```

## License
This project is licensed under the MIT License.

## package.json
```json
{
  "name": "space-explorer",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/app.js"
  },
  "dependencies": {
    "axios": "^1.0.0",
    "inquirer": "^9.0.0"
  }
}
```