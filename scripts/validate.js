//  Валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const checkForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  if (!inputList.every((input) => input.length > 0)) {
    toggleButtonState(inputList, buttonElement);
  };
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

const isFormValid = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__save-button');
  if (inputList.every((input) => input.length > 1) || inputList.every((input) => input.validity.valid)) {
    //console.log('нет');
  }
  else {
    //console.log('да');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //console.log("1: " + inputList[0].value);
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      //console.log("0: " + inputList[0].value.length);
      //console.log("1: " + inputList[1].value.length);
      //if (inputList.every((input) => { return (input.value.length > 0) })) {
      //console.log(inputList.every((input) => input.value.length > 1));
      //console.log(inputList.every((input) => input.validity.valid));
      //if (!inputList.every((input) => input.value.length > 1) || !inputList.every((input) => input.validity.valid)) {
        toggleButtonState(inputList, buttonElement);
      //};
      checkInputValidity(formElement, inputElement);
      isFormValid(formElement);
    });
    inputElement.addEventListener('keydown', function (evt) {
      //  При нажатии Enter проверяем валидность полей
      if (evt.keyCode === 13) {
        if (inputList.every((input) => { return (input.value.length > 1) && inputElement.validity.valid })) {
          toggleButtonState(inputList, buttonElement);
        }
        else {
          evt.preventDefault();   
        }
        checkInputValidity(formElement, inputElement);
      }
    });
  });
};

const allClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_type_inactive');
  }
  else {
    buttonElement.classList.remove('popup__save-button_type_inactive');
  }
}