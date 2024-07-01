document.getElementById('submit-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    getWeather(location);
});

async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    const output = `
City: ${data.name}
Temperature: ${data.main.temp} °C
Weather: ${data.weather[0].description}
Humidity: ${data.main.humidity} %
Wind Speed: ${data.wind.speed} m/s
    `;
    document.getElementById('weather-output').textContent = output;
}

function displayError(message) {
    document.getElementById('weather-output').textContent = `Error: ${message}`;
}

async function detectLocation() {
    try {
        const response = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN');
        const data = await response.json();
        const location = data.city;
        getWeather(location);
    } catch (error) {
        displayError('Failed to detect location.');
    }
}

// Detect location on page load
window.onload = detectLocation;
