import { View } from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.form');
  constructor() {
    super();
    this.addHandlerFocus();
    this.addHandlerBlur();
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', handler);
  }

  addHandlerFocus() {
    this._parentElement
      .querySelector('.input-field')
      .addEventListener(
        'focus',
        () => (this._parentElement.querySelector('.label').style.opacity = 1)
      );
  }

  addHandlerBlur() {
    this._parentElement
      .querySelector('.input-field')
      .addEventListener(
        'blur',
        () => (this._parentElement.querySelector('.label').style.opacity = 0)
      );
  }
}

export default new SearchView();
