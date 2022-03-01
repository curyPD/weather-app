export const state = {
  weatherData: {},
  forecastData: [],
  position: '',
  coord: {},
  unit: 'C',
};

export const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getWeatherData = async function (coordinates) {
  try {
    // 1. Get location
    const { lat, lon, name } = coordinates;
    // 2. Get weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=45342ac40cb9ef695441b927f8ac5ee5`
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    // 3. Update state weather data
    state.weatherData = {
      dt: data.dt,
      temp: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather,
      wind: data.wind.speed,
      active: true,
    };
    state.position = `${name ? name : data.name}, ${data.sys.country}`;
    state.coord = data.coord;
  } catch (err) {
    throw err;
  }
};

export const getForecastedWeather = async function () {
  try {
    // 1. Get position
    const { lat, lon } = state.coord;
    // 2. Get forecast data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=45342ac40cb9ef695441b927f8ac5ee5`
    );
    if (!response.ok) throw new Error();
    const { list: data } = await response.json();
    // 3. Update state forecast data
    const newData = data
      .filter((_, i) => i % 8 === 0)
      .map(obj => {
        return {
          dt: obj.dt,
          temp: obj.main.temp,
          humidity: obj.main.humidity,
          weather: obj.weather,
          wind: obj.wind.speed,
          active: false,
        };
      });
    newData.splice(0, 1, state.weatherData);
    state.forecastData = newData;
  } catch (err) {
    throw err;
  }
};

export const doGeocoding = async function (cityName, countryCode) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}${
        countryCode ? ',' + countryCode : ''
      }&appid=45342ac40cb9ef695441b927f8ac5ee5`
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (data.length === 0) throw new Error('');
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
  } catch (err) {
    throw err;
  }
};
