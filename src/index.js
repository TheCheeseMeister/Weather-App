import { buildPage } from './page';
import './style.css';

// [location]/[date1]/[date2]?key=YOUR_API_KEY
const baseLink = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const apiKey = 'TGLBQYWMH8JGJB32WSP2U4T8Z';

const text = document.getElementById('location');
const btn = document.getElementById('submit');
btn.addEventListener("click", (event) => {
    event.preventDefault();

    searchLocation(text.value);

    text.value = '';
});

async function searchLocation(location) {
    console.log('loading...');
    const link = baseLink + location + `?key=${apiKey}`;

    const response = await fetch(link, {mode: 'cors'});
    const weatherData = await response.json();
    buildPage(weatherData);
}

/* Create object for JSON data storage */

/* Create new js file (?) for handling page layout stuff */