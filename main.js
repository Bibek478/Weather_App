const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'api_key',
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
  }
};

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    // Update UI with weather data
    document.getElementById('locationName').textContent = data.location.name;
    document.getElementById('temp_c').textContent = `${Math.round(data.current.temp_c)}`;
    document.getElementById('feelslike').textContent = `${Math.round(data.current.feelslike_c)}°C`;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('windspeed').textContent = `${Math.round(data.current.wind_kph)} km/h`;
  } catch (error) {
    // Reset UI on error
    document.getElementById('locationName').textContent = error.message;
    document.getElementById('temp_c').textContent = '--';
    document.getElementById('feelslike').textContent = '--°C';
    document.getElementById('humidity').textContent = '--%';
    document.getElementById('windspeed').textContent = '-- km/h';
    console.error('Error fetching weather data:', error);
  }
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');

  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  });

  cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeather(city);
      }
    }
  });

  // Load default city on page load
  fetchWeather('Kolkata');
});