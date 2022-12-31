//  Валидация форм
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationConfig.errorClass}`);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.classList.remove(`${validationConfig.errorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, validationConfig);
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
  formList.forEach((formElement) => {
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  }
  else {
    enableSubmitButton(buttonElement, validationConfig);
  }
}

function disableSubmitButton(buttonElement, validationConfig) {
  buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
}

function enableSubmitButton(buttonElement, validationConfig) {
  buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}

//  Сброс сообщенний об ошибках при повторном открытии после закрытия
//  формы с ошибками валидации
function resetFormErrors(formElement) {
  formElement.querySelectorAll('.popup__input').forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}