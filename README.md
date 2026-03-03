# Weather Dashboard - Real-Time Weather Application

A beautiful, modern weather dashboard that displays real-time weather data for multiple cities with a 3-day forecast. Built with vanilla JavaScript, HTML, and CSS using the OpenWeatherMap API.

![Weather Dashboard](preview.png)

## ✨ Features

- **Real-Time Weather Data**: Fetch current weather conditions for any city worldwide
- **3-Day Forecast**: View detailed weather predictions for the next 3 days
- **Current Location Support**: Automatically fetch weather data for your current location
- **City Search**: Smart search with autocomplete suggestions
- **Multiple Cities**: Display weather for multiple cities simultaneously
- **Beautiful UI**: Modern, clean design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Loading States**: Elegant loading indicators for better user experience
- **Error Handling**: Clear error messages for better user feedback

## 🎨 Design Features

- Refined gradient background with grain texture overlay
- Beautiful typography using Playfair Display and DM Sans
- Smooth animations and transitions
- Interactive hover effects
- Weather icons with floating animation
- Glassmorphism effects with backdrop blur
- Custom scrollbar styling

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code recommended)
- An OpenWeatherMap API key (free)

### Step 1: Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" to create a free account
3. Navigate to your API keys section
4. Copy your API key

### Step 2: Setup the Project

1. Download or clone all project files:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Place all files in the same folder

3. Open `script.js` in your text editor

4. Replace `YOUR_API_KEY_HERE` with your actual API key on line 4:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

### Step 3: Run the Application

1. Open `index.html` in your web browser
2. You can either:
   - Double-click the `index.html` file
   - Right-click and select "Open with" → Your browser
   - Use VS Code's Live Server extension for a better development experience

## 📖 How to Use

### Search for a City
1. Type a city name in the search bar
2. Select from the autocomplete suggestions or press Enter
3. View the current weather and 3-day forecast

### Use Current Location
1. Click the "My Location" button in the header
2. Allow location access when prompted by your browser
3. Weather data for your location will be displayed automatically

### View Multiple Cities
- The dashboard displays weather for London, Tokyo, and New York by default
- Click on any city card to view its detailed weather

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations, and custom properties
- **Vanilla JavaScript**: ES6+ features, async/await, Fetch API
- **OpenWeatherMap API**: Weather data provider

### API Endpoints Used
- **Current Weather Data**: `api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `api.openweathermap.org/data/2.5/forecast`
- **Geocoding**: `api.openweathermap.org/geo/1.0/direct`

### Key Concepts Covered
- ✅ API Integration with Fetch API
- ✅ Asynchronous JavaScript (async/await, Promises)
- ✅ Dynamic DOM Manipulation
- ✅ Event Handling
- ✅ Geolocation API
- ✅ Error Handling
- ✅ Debouncing for search optimization
- ✅ Responsive Design
- ✅ CSS Animations and Transitions

## 📁 Project Structure

```
weather-dashboard/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality and API calls
└── README.md           # Project documentation
```

## 🎯 Features Breakdown

### Current Weather Display
- City name and country
- Current date and time
- Large temperature display
- Weather description
- Weather icon with animation
- Feels like temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure

### 3-Day Forecast
- Day of the week
- Date
- Weather icon
- Description
- High and low temperatures

### Additional Features
- Search with autocomplete suggestions
- Current location detection
- Multiple city weather cards
- Smooth loading states
- Error handling with user-friendly messages

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --color-primary: #1a1a2e;
    --color-secondary: #16213e;
    --color-accent: #0f4c75;
    --color-highlight: #3282b8;
    /* ... other colors */
}
```

### Changing Default Cities
Edit the `defaultCities` array in `script.js`:

```javascript
const defaultCities = ['London', 'Tokyo', 'New York'];
```

### Changing Temperature Units
The app uses Celsius by default. To switch to Fahrenheit, change `units=metric` to `units=imperial` in the API calls in `script.js`.

## 🐛 Troubleshooting

### "Please add your OpenWeatherMap API key" error
- Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key in `script.js`
- Check that your API key is active (it may take a few minutes after registration)

### "City not found" error
- Check your spelling
- Try searching for a larger city nearby
- Make sure you have an internet connection

### Location button not working
- Check that you've allowed location access in your browser
- Some browsers require HTTPS for geolocation to work
- Try using the search feature instead

### Weather data not loading
- Verify your API key is correct and active
- Check your internet connection
- Make sure you haven't exceeded the free tier API limits (60 calls/minute)

## 📝 API Limits

The free OpenWeatherMap API tier includes:
- 60 calls per minute
- 1,000,000 calls per month
- Current weather data
- 5-day / 3-hour forecast

This should be more than enough for personal use!

## 🌟 Bonus Features Implemented

- ✅ Current location support with geolocation API
- ✅ Auto-fetch weather data for user's location
- ✅ Search autocomplete with debouncing
- ✅ Multiple city display
- ✅ Beautiful animations and transitions
- ✅ Responsive design for all screen sizes
- ✅ Error handling and loading states

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📄 License

This project is free to use for personal and educational purposes.

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:
- Add hourly forecast
- Include weather alerts
- Add more cities
- Implement dark/light theme toggle
- Add weather maps
- Include UV index and sunrise/sunset times

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section
2. Review the OpenWeatherMap API documentation
3. Make sure all files are in the same directory
4. Check the browser console for error messages

## 🎓 Learning Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [JavaScript Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

---

**Enjoy your Weather Dashboard! 🌤️**
