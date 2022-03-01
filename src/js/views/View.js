export class View {
  _icons = {
    '01d': 'ph-sun',
    '01n': 'ph-moon-stars',
    '02d': 'ph-cloud-sun',
    '02n': 'ph-cloud-moon',
    '03d': 'ph-cloud',
    '03n': 'ph-cloud',
    '04d': 'ph-cloud',
    '04n': 'ph-cloud',
    '09d': 'ph-cloud-snow',
    '09n': 'ph-cloud-snow',
    '10d': 'ph-cloud-rain',
    '10n': 'ph-cloud-rain',
    '11d': 'ph-cloud-lightning',
    '11n': 'ph-cloud-lightning',
    '13d': 'ph-snowflake',
    '13n': 'ph-snowflake',
    '50d': 'ph-cloud-fog',
    '50n': 'ph-cloud-fog',
  };

  render(data) {
    this._data = data;
    this.clearParent();
    this._generateMarkup();
  }

  renderSpinner() {
    this.clearParent();
    const html = `
    <div class="spinner">
      <div class="spinner__box">
        <i class="ph-spinner spinner__icon"></i>
      </div>
    </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  clearParent() {
    this._parentElement.innerHTML = '';
  }

  renderError(errorMessasge) {
    const html = `
      <div class="error">
        <p class="error__text">
          ${errorMessasge || this._errorMessage}
        </p>
      </div>
    `;
    this.clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage() {
    const html = `
      <div class="message">
        <p class="message__text">
          ${this._message}
        </p>
      </div>
    `;
    this.clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _getDate = function (date) {
    return new Intl.DateTimeFormat(navigator.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);
  };

  _getTime = function (time) {
    return new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(time);
  };
}
