import { View } from './View.js';

class WeatherView extends View {
  _parentElement = document.querySelector('.weather-section');
  _data;
  _errorMessage = "Couldn't find weather data for provided location";
  _message = 'Get weather data from over 200,000 cities around the world!';

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerSwitchUnit(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _generateMarkup() {
    const now = new Date();
    const date = this._getDate(now);
    const time = this._getTime(now);

    const html = `
    <p class="location">${this._data.position}</p>
    <div class="date-time-box">
      <p class="date">${date}</p>
      <p class="time">${time}</p>
    </div>
    <div class="weather-box">
      <p class="temperature">
        <span class="temperature__value">${Math.round(
          this._data.weatherData.temp
        )}</span>
        <button class="btn btn--text btn--switch-unit" data-switchto="${
          this._data.unit === 'C' ? 'F' : 'C'
        }">
          <span class="temperature__unit">°${this._data.unit}</span>
        </button>
      </p>
      <div class="weather">
        <i class="${
          this._icons[this._data.weatherData.weather[0].icon]
        } description-icon"></i>
        <span class="description">${
          this._data.weatherData.weather[0].main
        }</span>
        <i class="ph-drop"></i>
        <p class="humidity">
          <span class="humidity__value">${this._data.weatherData.humidity}</span
          ><span class="humidity__unit">%</span>
        </p>
        <i class="ph-wind"></i>
        <p class="wind">
          <span class="wind__value">${this._data.weatherData.wind}</span>
          <span class="wind__unit">m/s</span>
        </p>
      </div>
    </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new WeatherView();
