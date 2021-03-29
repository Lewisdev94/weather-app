# Weather App

A small app built in vanilla Javascript that displays the current weather.

## Live Preview

Site is live [here](https://lewisdev94-weather-app.netlify.app/), hosted on Netlify.

## Technologies

- HTML, CSS, JavaScript, API Fetch
- Open Weather API

## Current Features

- Displays the location, temperature, summary and weather icon for given coordinates
- Temperature can be switched between celsius and fahrenheit
- Theme changes depending on local time of day
- Temperature ring changes depending on current temperature

## Future Improvements

- Work out a new way to do the gradient ring. Causing issues for a clean theme change.
- Make location request a user action 
- Make app mobile responsive
- Make background dynamic based on time of day
- Provide error messaging for the weather API
- Provide error messaging if a location isn't provided to the app from the browser (option for manual input?)
- Ask for a name to be stored within cookies for a personalised page on each load
- Auto refresh the page after 15(?)minutes for an updated weather report. How does this work with the current function on page load?



## Completed Improvements

- Placeholders provided for all data fields for when the API is slow. (29/03/2021)
- Background changes depending on the local time of day. (29/03/2021)
- CORS proxy removed. No longer needed on dev or production. (26/03/2021)
- API key is now hidden from client side using Netlify environment variable. API key also changed and deleted on OpenWeatherMap. (26/03/2021)
- Current date and time code built in JS. (24/03/2021)
- Added welcome message with variable text depending on time of day (Good morning/afternoon/evening etc). (24/03/2021)
- Added a dynamically changing page title. Shows the basic weather summary and the degrees. Degrees change dynamically depending if C or F are selected on screen. (24/03/2021)
- Added sunrise and sunset data. Data converted from unix time into standard 24HR clock time. (24/03/2021)
- Default favicon now displays before the API call is complete. Safari will continue to show the default due to lack of dynamic favicon changes, other browsers will update dynamically. Chrome and Firefox tested and working. (23/03/2021)
- Changed all API fetches to https. (23/03/2021)


## Creators

Built by Lewis Chandler - [Lewisdev94](https://github.com/Lewisdev94)
Designed by Ola
