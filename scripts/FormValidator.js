class FormValidator {
  
  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._formElement = formElement;
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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //  Переключение кнопки формы в статус неактивная
  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(`${this._validationConfig.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }

  //  Переключение кнопки формы в статус активная
  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(`${this._validationConfig.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }

  //  Валидация поля ввода
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //  Переключение кнопки формы в статусы активная/неактивная
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    }
    else {
      this._enableSubmitButton(buttonElement);
    }
  }

  //  Сброс сообщенний об ошибках при повторном открытии после закрытия
  //  формы с ошибками валидации
  _resetFormErrors() {
    this._formElement.querySelectorAll('.popup__input').forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //  Установка слушателя события ввода символа в input
  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(`${this._validationConfig.inputSelector}`));
    const buttonElement = this._formElement.querySelector(`${this._validationConfig.submitButtonSelector}`);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
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

export default FormValidator;