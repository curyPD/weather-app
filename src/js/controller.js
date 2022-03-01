import * as model from './model.js';
import weatherView from './views/weatherView.js';
import forecastView from './views/forecastView.js';
import searchView from './views/searchView.js';
import * as Functions from './helpers.js';
import countries from 'i18n-iso-countries';
import 'regenerator-runtime';
import 'core-js/actual';

const displayWeatherData = async function (coords) {
  try {
    weatherView.renderSpinner();
    await model.getWeatherData(coords);
    weatherView.render(model.state);
    await controlForecastedWeather();
  } catch (err) {
    throw err;
  }
};

const controlSwitchUnit = function (e) {
  const btn = e.target.closest('.btn--switch-unit');
  if (!btn) return;
  const unit = btn.dataset.switchto;
  model.state.unit = unit;
  if (unit === 'C') {
    model.state.forecastData.forEach(
      obj => (obj.temp = Functions.convertFtoC(obj.temp))
    );
  }
  if (unit === 'F') {
    model.state.forecastData.forEach(
      obj => (obj.temp = Functions.convertCtoF(obj.temp))
    );
  }
  weatherView.render(model.state);
  forecastView.render(model.state);
};

const controlForecastedWeather = async function () {
  try {
    forecastView.renderSpinner();
    await model.getForecastedWeather();
    forecastView.render(model.state);
  } catch (err) {
    console.error(err);
  }
};

const controlCurrentPositionWeather = async function () {
  try {
    const position = await model.getPosition();
    const { latitude: lat, longitude: lon } = position.coords;
    await displayWeatherData({ lat, lon });
  } catch (err) {
    console.error(err);
    weatherView.renderMessage();
  }
};

const controlForecastClick = function (e) {
  const day = e.target.closest('.forecast__item');
  if (!day) return;
  const dt = +day.dataset.dt;
  const weatherObj = model.state.forecastData.find(obj => obj.dt === dt);
  model.state.forecastData.forEach(obj => (obj.active = false));
  weatherObj.active = true;
  model.state.weatherData = weatherObj;
  weatherView.render(model.state);
  forecastView.render(model.state);
};

const controlFormSubmit = async function (e) {
  try {
    e.preventDefault();
    const inputField = e.target.querySelector('.input-field');
    const input = inputField.value;
    if (!input) return;
    inputField.value = '';
    inputField.blur();
    const cityName = input.slice(
      0,
      input.indexOf(',') === -1 ? input.length : input.indexOf(',')
    );
    const countryName =
      input.indexOf(',') === -1
        ? undefined
        : input.slice(input.indexOf(',') + 1).trim();
    const countryCode = countries.getAlpha2Code(countryName, 'en');
    const coordinates = await model.doGeocoding(cityName, countryCode);
    await displayWeatherData(coordinates);
  } catch (err) {
    console.error(err);
    if (err.message === 'Failed to fetch')
      weatherView.renderError(
        'Failed to fetch data. Check your internet connection and try again.'
      );
    else {
      weatherView.renderError(err.message);
    }
    forecastView.clearParent();
  }
};

const init = function () {
  weatherView.addHandlerLoad(controlCurrentPositionWeather);
  weatherView.addHandlerSwitchUnit(controlSwitchUnit);
  forecastView.addHandlerClick(controlForecastClick);
  searchView.addHandlerSubmit(controlFormSubmit);
  countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
};
init();
