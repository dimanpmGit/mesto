export default class FormValidator {
  
  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._formButton = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
    this._inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  }

  //  Отображение ошибок валидации поля ввода (input)
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._validationConfig.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._validationConfig.errorClass}`);
  }

  //  Скрытие ошибок валидации поля ввода (input)
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._validationConfig.inputErrorClass}`);
    errorElement.classList.remove(`${this._validationConfig.errorClass}`);
    errorElement.textContent = '';
  }

  //  Есть ли хоть одно невалидное поле в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //  Валидация поля ввода
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //  Переключение кнопки формы в статус неактивная
  disableSubmitButton() {
    this._formButton.classList.add(`${this._validationConfig.inactiveButtonClass}`);
    this._formButton.setAttribute('disabled', true);
  }

  //  Переключение кнопки формы в статус активная
  enableSubmitButton() {
    this._formButton.classList.remove(`${this._validationConfig.inactiveButtonClass}`);
    this._formButton.removeAttribute('disabled');
  }

  //  Переключение кнопки формы в статусы активная/неактивная
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    }
    else {
      this.enableSubmitButton();
    }
  }

  //  Сброс сообщенний об ошибках при повторном открытии после закрытия
  //  формы с ошибками валидации
  _resetFormErrors() {
    //this._formElement.querySelectorAll('.popup__input').forEach((inputElement) => {
      this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //  Установка слушателя события ввода символа в input
  _setEventListeners(){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  //  Запуск валидации всех полей формы
  enableValidation(){
    this._setEventListeners();
    this._resetFormErrors();
  }
}