import { View } from './View.js';

class ForecastView extends View {
  _parentElement = document.querySelector('.forecast__list');
  _data;
  _errorMessage = "Couldn't find forecast data for provided location";
  _message;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _generateMarkup() {
    const html = this._data.forecastData.reduce(
      (str, obj, i) =>
        (str += `
          <li class="forecast__item ${
            obj.active ? 'forecast__item--active' : ''
          }" data-dt="${obj.dt}">
            <p class="forecast__date">${this._getDate(
              Date.now() + 24 * 60 * 60 * 1000 * i
            )}</p>
            <i class="${this._icons[obj.weather[0].icon]} forecast__icon"></i>
            <p class="forecast__temperature">
              <span class="forecast-temperature__value">${Math.round(
                obj.temp
              )}</span>
              <span class="forecast-temperature__unit">°${
                this._data.unit
              }</span>
            </p>
          </li>
          `),
      ''
    );
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new ForecastView();
