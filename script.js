const apiKey = 'c41b63615762f9b21924d10dc57f44c2';

        function displayWeather(data) {
            const weatherCondition = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            document.getElementById('weatherCondition').textContent = `Condition: ${weatherCondition}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        }

        function getWeatherByInput() {
            const location = document.getElementById('locationInput').value;
            if (location) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(data => displayWeather(data))
                    .catch(error => console.error('Error fetching weather data:', error));
            }
        }

        function getWeatherByLocation(lat, lon) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching weather data:', error));
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    getWeatherByLocation(lat, lon);
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }

        document.addEventListener('DOMContentLoaded', getLocation);