// main.js

document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const zipCode = document.getElementById('zipCode').value;
    getWeather(zipCode);
});

function getWeather(zipCode) {
    const apiKey = '75d6eee035fa195a03a59cfee1e87156'; 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
            // Display weather information
            displayWeather(weatherData);

            // Fetch city-related image from Unsplash API
            fetchCityImage(weatherData.name);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const highTemp = document.getElementById('highTemp');
    const lowTemp = document.getElementById('lowTemp');
    const forecast = document.getElementById('forecast');
    const humidity = document.getElementById('humidity');

    highTemp.textContent = convertKelvinToFahrenheit(data.main.temp_max).toFixed(2);
    lowTemp.textContent = convertKelvinToFahrenheit(data.main.temp_min).toFixed(2);
    forecast.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity.toFixed(2);
}

function fetchCityImage(cityName) {
    const unsplashApiKey = 'FqKnRrLMJPECxIcE4WziJePVGF_QT7SCI3BFFjUVHWg';
    const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

    // Fetch a random city-related image from Unsplash
    fetch(`${unsplashApiUrl}?query=${cityName}&orientation=landscape&client_id=${unsplashApiKey}`)
        .then(response => response.json())
        .then(imageData => {
            // Check if the response contains a valid image URL
            if (imageData.urls && imageData.urls.regular) {
                // Set the image as the background
                document.body.style.backgroundImage = `url('${imageData.urls.regular}')`;
            } else {
                console.error('Invalid image data received from the Unsplash API.');
            }
        })
        .catch(error => {
            console.error('Error fetching image from Unsplash:', error);
        });
}

function convertKelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}
