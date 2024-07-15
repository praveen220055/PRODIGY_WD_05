document.getElementById('fetchWeatherButton').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherData(location) {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod === '404') {
        alert('Location not found');
        return;
    }

    const weatherData = document.getElementById('weatherData');
    weatherData.innerHTML = `
        <div><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
        <div><strong>Temperature:</strong> ${data.main.temp} °C</div>
        <div><strong>Weather:</strong> ${data.weather[0].description}</div>
        <div><strong>Humidity:</strong> ${data.main.humidity} %</div>
        <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
}
