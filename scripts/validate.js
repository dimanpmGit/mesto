//  Валидация форм
const showInputError = (formElement, inputElement, errorMessage, classListObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${classListObj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classListObj.errorClass}`);
};

const hideInputError = (formElement, inputElement, classListObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${classListObj.inputErrorClass}`);
  errorElement.classList.remove(`${classListObj.errorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, classListObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classListObj);
  } else {
    hideInputError(formElement, inputElement, classListObj);
  }
};

const setEventListeners = (formElement, classListObj) => {
  const inputList = Array.from(formElement.querySelectorAll(`${classListObj.inputSelector}`));
  const buttonElement = formElement.querySelector(`${classListObj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, classListObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, classListObj);
      checkInputValidity(formElement, inputElement, classListObj);
    });
    inputElement.addEventListener('keydown', function (evt) {
      //  При нажатии Enter проверяем валидность полей
      if (evt.keyCode === 13) {
        if (inputList.every((input) => { return (input.value.length > 1) && inputElement.validity.valid })) {
          toggleButtonState(inputList, buttonElement, classListObj);
        }
        else {
          evt.preventDefault();   
        }
        checkInputValidity(formElement, inputElement, classListObj);
      }
    });
  });
};

const enableValidation = (classListObj) => {
  const formList = Array.from(document.querySelectorAll(`${classListObj.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((formElement) => {
      setEventListeners(formElement, classListObj);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.every((inputElement) => {
    return (inputElement.value.length > 1) && (inputElement.validity.valid);
  });
}

function toggleButtonState(inputList, buttonElement, classListObj) {
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${classListObj.inactiveButtonClass}`);
  }
  else {
    buttonElement.classList.remove(`${classListObj.inactiveButtonClass}`);
  }
}