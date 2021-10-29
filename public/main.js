const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');

const kelvinToFarenheit = temp => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

const addWeatherToDOM = data => {
  weatherDisplay.innerHTML `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `;

  cityInput.value = '';
};

const fetchWeatherData = async city => {
  const url = `/api?q=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    alert('City not found');
    return;
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFarenheit(data.main.temp),
  };

  addWeatherToDOM(displayData);
};

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  if (cityInput.value === '') {
    alert('Please enter a city');
  } else {
    fetchWeather(cityInput.value);
  }
});

fetchWeather('Miami');