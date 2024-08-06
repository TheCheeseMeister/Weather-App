class Weather {
    constructor(address, alerts, currentConditions, days, 
        description, resolvedAddress) {
        this.address = address;
        this.alerts = alerts; // flood watch, etc.
        this.currentConditions = currentConditions;
        this.days = days; // like next 7 day forecast
        this.description = description;
        this.fullAddress = resolvedAddress; // with country
    }
}

function parseData(weatherData) {
    let address = weatherData.address;
    let alerts = weatherData.alerts;
    let currentConditions = weatherData.currentConditions;
    let days = weatherData.days;
    let description = weatherData.description;
    let resolvedAddress = weatherData.resolvedAddress;

    return new Weather(address, alerts, currentConditions, days, 
        description, resolvedAddress
    );
}

const container = document.getElementById("container");

export function buildPage(weatherData) {
    const data = parseData(weatherData);
    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.classList.add('header');

    const icon = document.createElement('div');
    icon.classList.add('icon');

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = weatherData.address;

    const status = document.createElement('p');
    status.classList.add('status');
    status.textContent = weatherData.currentConditions.conditions;

    const temp = document.createElement('h1');
    temp.classList.add('temp');
    temp.textContent = weatherData.currentConditions.temp;

    const hiLo = document.createElement('div');
    hiLo.classList.add('hi-lo');

    const hi = document.createElement('p');
    hi.textContent = `High: ${weatherData.days[0].tempmax}`;

    const lo = document.createElement('p');
    lo.textContent = `Low: ${weatherData.days[0].tempmin}`;

    hiLo.appendChild(hi);
    hiLo.appendChild(lo);

    icon.appendChild(title);
    icon.appendChild(status);
    icon.appendChild(temp);
    icon.appendChild(hiLo);

    // Times
    const times = document.createElement('div');
    times.classList.add('times');

    let d = new Date();
    let currHour = d.getHours();
    let i = 0;

    do {
        const time = document.createElement('div');
        time.classList.add('test');

        const hour = document.createElement('p');
        if (currHour == 0) {
            hour.textContent = currHour;
        } else if (currHour > 12) {
            hour.textContent = currHour-12;
        } else {
            hour.textContent = currHour;
        }

        if (currHour == 0 || currHour == 24 || currHour < 12) {
            hour.textContent += " am";
        } else hour.textContent += " pm";
        
        const currTemp = document.createElement('p');
        currTemp.textContent = weatherData.days[0].hours[i].temp;

        time.appendChild(hour);
        time.appendChild(currTemp);

        times.appendChild(time);

        if (currHour == 24) currHour = 1;
        else currHour++;

        i++;
    } while (i < 10);

    header.appendChild(icon);
    header.appendChild(times);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    const stats = document.createElement('div');
    stats.classList.add('stats');

    // -- lots of p definitions
    const rise = document.createElement('p');
    rise.textContent = `Sunrise: ${weatherData.currentConditions.sunrise}`;

    const set = document.createElement('p');
    set.textContent = `Sunset: ${weatherData.currentConditions.sunset}`;

    const chanceRain = document.createElement('p');
    chanceRain.textContent = `Chance of Rain: ${weatherData.days[0].precipprob}%`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${weatherData.days[0].humidity}%`;

    const wind = document.createElement('p');
    wind.textContent = `Wind: Something mph lol`;

    const feel = document.createElement('p');
    feel.textContent = `Feels Like: ${weatherData.currentConditions.feelslike}`;

    const precipitation = document.createElement('p');
    precipitation.textContent = `Precipitation: ${weatherData.currentConditions.precip} in`;

    stats.appendChild(rise);
    stats.appendChild(set);
    stats.appendChild(chanceRain);
    stats.appendChild(humidity);
    stats.appendChild(wind);
    stats.appendChild(feel);
    stats.appendChild(precipitation);

    const alerts = document.createElement('div');
    alerts.classList.add('alerts');

    const alertHead = document.createElement('h3');
    alertHead.textContent = `Alerts (${weatherData.alerts.length})`;

    alerts.appendChild(alertHead);

    for (i = 0; i < weatherData.alerts.length; i++) {
        const temp = document.createElement('div');
        temp.classList.add('alert');
        temp.textContent = weatherData.alerts[i].event;
        alerts.appendChild(temp);
    }

    content.appendChild(stats);
    content.appendChild(alerts);

    container.appendChild(header);
    container.appendChild(content);
}