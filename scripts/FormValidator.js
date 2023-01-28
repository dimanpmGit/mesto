class FormValidator {
  
  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${validationConfig.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${validationConfig.errorClass}`);
  }

  _hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
    errorElement.classList.remove(`${validationConfig.errorClass}`);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitButton(buttonElement, validationConfig) {
    buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton(buttonElement, validationConfig) {
    buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }

  _checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      this._hideInputError(formElement, inputElement, validationConfig);
    }
  }

  _toggleButtonState(inputList, buttonElement, validationConfig) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement, validationConfig);
    }
    else {
      this._enableSubmitButton(buttonElement, validationConfig);
    }
  }

  _resetFormErrors(formElement) {
    formElement.querySelectorAll('.popup__input').forEach((inputElement) => {
      this._hideInputError(formElement, inputElement, this._validationConfig);
    });
  }

  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(`${this._validationConfig.inputSelector}`));
    const buttonElement = this._formElement.querySelector(`${this._validationConfig.submitButtonSelector}`);
    this._toggleButtonState(inputList, buttonElement, this._validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement, this._validationConfig);
        this._checkInputValidity(this._formElement, inputElement, this._validationConfig);
      });
    });
  }

  enableValidation(){
    this._setEventListeners();
    this._resetFormErrors(this._formElement);
  }
}

export default FormValidator;