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
        console.log(currHour);
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

    container.appendChild(header);
}