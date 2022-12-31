//////////////////////
//  Валидация форм  //
//////////////////////

//  Отображение ошибок валидации поля ввода (input)
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationConfig.errorClass}`);
};

//  Скрытие ошибок валидации поля ввода (input)
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.classList.remove(`${validationConfig.errorClass}`);
  errorElement.textContent = '';
};

//  Валидация поля ввода
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//  Установка слушателя события ввода символа в input
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

//  Запуск валидации всех форм на странице
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
  formList.forEach((formElement) => {
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  });
};

//  Есть ли хоть одно невалидное поле в форме
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//  Переключение кнопки формы в статусы активная/неактивная
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  }
  else {
    enableSubmitButton(buttonElement, validationConfig);
  }
}

//  Переключение кнопки формы в статус неактивная
function disableSubmitButton(buttonElement, validationConfig) {
  buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', true);
}

//  Переключение кнопки формы в статус активная
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