import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmiter) {
    super(popupSelector);
    this._formSubmiter = formSubmiter;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputValue) => {
      inputValues[inputValue.name] = inputValue.value;
    })
    
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._formSubmiter(this._getInputValues());
    });
  }

  // Закрытие попапа
  close() {
    super.close();
    this._popupForm.reset();
  }
}