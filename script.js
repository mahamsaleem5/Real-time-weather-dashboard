// OpenWeatherMap API Configuration
// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
// Get your free API key at: https://openweathermap.org/api
const API_KEY = 'c65af9aeb9ab2233f5605dfcd031886d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const locationBtn = document.getElementById('locationBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherContent = document.getElementById('weatherContent');
const errorMessage = document.getElementById('errorMessage');

// Current weather elements
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const weatherIcon = document.getElementById('weatherIcon');
const currentTemp = document.getElementById('currentTemp');
const weatherDescription = document.getElementById('weatherDescription');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const forecastCards = document.getElementById('forecastCards');
const additionalCities = document.getElementById('additionalCities');

// Weather icon mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Default cities to display
const defaultCities = ['London', 'Tokyo', 'New York'];
let searchTimeout;

// Initialize the app
function init() {
    setupEventListeners();
    loadDefaultCities();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update time every minute
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keypress', handleSearchKeyPress);
    locationBtn.addEventListener('click', getUserLocation);
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });
}

// Handle search input with debouncing
function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    searchTimeout = setTimeout(() => {
        searchCities(query);
    }, 300);
}

// Handle Enter key press in search
function handleSearchKeyPress(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            suggestionsContainer.classList.remove('active');
            getWeatherByCity(query);
        }
    }
}

// Search for cities using Geocoding API
async function searchCities(query) {
    try {
        const response = await fetch(
            `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error('City search failed');
        
        const cities = await response.json();
        displaySuggestions(cities);
    } catch (error) {
        console.error('Error searching cities:', error);
    }
}

// Display city suggestions
function displaySuggestions(cities) {
    if (cities.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    suggestionsContainer.innerHTML = cities
        .map(city => {
            const country = city.country || '';
            const state = city.state ? `, ${city.state}` : '';
            return `
                <div class="suggestion-item" onclick="selectCity('${city.name}', ${city.lat}, ${city.lon})">
                    ${city.name}${state}, ${country}
                </div>
            `;
        })
        .join('');
    
    suggestionsContainer.classList.add('active');
}

// Select a city from suggestions
function selectCity(name, lat, lon) {
    searchInput.value = name;
    suggestionsContainer.classList.remove('active');
    getWeatherByCoordinates(lat, lon, name);
}

// Get user's current location
function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        },
        error => {
            hideLoading();
            showError('Unable to retrieve your location. Please check your browser permissions.');
            console.error('Geolocation error:', error);
        }
    );
}

// Get weather data by city name
async function getWeatherByCity(cityName) {
    showLoading();
    hideError();
    
    try {
        // First, get coordinates for the city
        const geoResponse = await fetch(
            `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
        );
        
        if (!geoResponse.ok) throw new Error('City not found');
        
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            throw new Error('City not found');
        }
        
        const { lat, lon, name } = geoData[0];
        await getWeatherByCoordinates(lat, lon, name);
    } catch (error) {
        hideLoading();
        showError('City not found. Please try another city.');
        console.error('Error fetching weather:', error);
    }
}

// Get weather data by coordinates
async function getWeatherByCoordinates(lat, lon, cityNameOverride = null) {
    showLoading();
    hideError();
    
    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!currentResponse.ok) throw new Error('Weather data not available');
        
        const currentData = await currentResponse.json();
        
        // Fetch forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) throw new Error('Forecast data not available');
        
        const forecastData = await forecastResponse.json();
        
        // Display the data
        displayCurrentWeather(currentData, cityNameOverride);
        displayForecast(forecastData);
        
        hideLoading();
        weatherContent.classList.add('active');
    } catch (error) {
        hideLoading();
        showError('Unable to fetch weather data. Please try again later.');
        console.error('Error fetching weather:', error);
    }
}

// Display current weather
function displayCurrentWeather(data, cityNameOverride) {
    const city = cityNameOverride || data.name;
    const temp = Math.round(data.main.temp);
    const feels = Math.round(data.main.feels_like);
    const icon = weatherIcons[data.weather[0].icon] || '🌡️';
    
    cityName.textContent = `${city}, ${data.sys.country}`;
    currentTemp.textContent = temp;
    weatherIcon.textContent = icon;
    weatherDescription.textContent = data.weather[0].description;
    feelsLike.textContent = `${feels}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Display 3-day forecast
function displayForecast(data) {
    // Get forecast for next 3 days at noon (12:00)
    const forecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    
    forecastCards.innerHTML = forecasts
        .map(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const tempHigh = Math.round(forecast.main.temp_max);
            const tempLow = Math.round(forecast.main.temp_min);
            const icon = weatherIcons[forecast.weather[0].icon] || '🌡️';
            const description = forecast.weather[0].description;
            
            return `
                <div class="forecast-card">
                    <div class="forecast-date">${dayName}</div>
                    <div style="color: var(--color-text-muted); font-size: 0.85rem;">${dateStr}</div>
                    <div class="forecast-icon">${icon}</div>
                    <div class="forecast-desc">${description}</div>
                    <div class="forecast-temp">
                        <span class="forecast-temp-high">${tempHigh}°</span>
                        <span class="forecast-temp-low">${tempLow}°</span>
                    </div>
                </div>
            `;
        })
        .join('');
}

// Load weather for default cities
async function loadDefaultCities() {
    try {
        const cityPromises = defaultCities.map(city => fetchCityWeather(city));
        const results = await Promise.all(cityPromises);
        
        additionalCities.innerHTML = results
            .filter(result => result !== null)
            .map(data => createCityCard(data))
            .join('');
    } catch (error) {
        console.error('Error loading default cities:', error);
    }
}

// Fetch weather for a single city
async function fetchCityWeather(cityName) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) return null;
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching weather for ${cityName}:`, error);
        return null;
    }
}

// Create city card HTML
function createCityCard(data) {
    const temp = Math.round(data.main.temp);
    const icon = weatherIcons[data.weather[0].icon] || '🌡️';
    const description = data.weather[0].description;
    
    return `
        <div class="city-card" onclick="getWeatherByCity('${data.name}')">
            <div class="city-card-header">
                <div class="city-card-name">${data.name}, ${data.sys.country}</div>
                <div class="city-card-icon">${icon}</div>
            </div>
            <div class="city-card-temp">${temp}°C</div>
            <div class="city-card-desc">${description}</div>
        </div>
    `;
}

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Show loading spinner
function showLoading() {
    loadingSpinner.classList.add('active');
    weatherContent.classList.remove('active');
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.classList.remove('active');
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('active');
}

// Check if API key is set
function checkApiKey() {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('⚠️ Please add your OpenWeatherMap API key in script.js to use this application. Get your free key at https://openweathermap.org/api');
        return false;
    }
    return true;
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (checkApiKey()) {
            init();
        }
    });
} else {
    if (checkApiKey()) {
        init();
    }
}
