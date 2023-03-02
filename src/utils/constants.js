const page = document.querySelector('.page');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_card');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profileForm = profilePopup.querySelector('.popup__form');
const cardForm = cardPopup.querySelector('.popup__form');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputTopAdd = cardPopup.querySelector('.popup__input_type_top');
const inputBottomAdd = cardPopup.querySelector('.popup__input_type_bottom');
const inputTopEdit = profilePopup.querySelector('.popup__input_type_top');
const inputBottomEdit = profilePopup.querySelector('.popup__input_type_bottom');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-name');
const cardsContainer = document.querySelector('.elements__list');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const deletePopupDoc = document.querySelector('.popup_delete');
const avatarDoc = document.querySelector('.profile__avatar');
const avatarPopupDoc = document.querySelector('.popup_avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Конфиг для подключения к серверу
const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '795d4992-334e-420a-88f5-63bf4e3c7168',
    'Content-Type': 'application/json'
  }
}

export {
  config, page, profilePopup, cardPopup, imagePopup, profilePopupContainer, profileForm, cardForm, cardPopupContainer, profileName, profileDesc, editButton, addButton, inputTopAdd, inputBottomAdd, inputTopEdit, inputBottomEdit, popupImage,
  popupImageName, cardsContainer, buttonCloseList, validationConfig, deletePopupDoc, avatarDoc, avatarPopupDoc
};
