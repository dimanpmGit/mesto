import '../pages/index.css';

import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import { initialCards, profilePopup, cardPopup, editButton, addButton, validationConfig }
from "../utils/constants.js";
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';

//////////////////////////
//  Функционал страницы //
//////////////////////////

function createCard(item) {
  const card = new Card(item, '#card-item-template', () => imagePopupOpen(item));
  const cardElement = card.getView();
  return cardElement;
}

//  Добавление карточек при загрузке страницы
const cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (cardItem) => {
      const card = createCard(cardItem);
      cardsList.addItem(card);
    }
  },
  '.elements__list'
);

cardsList.renderElements();

const profileFormValidator = new FormValidator(validationConfig, profilePopup);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardPopup);
cardFormValidator.enableValidation();

//  Добавление карточки
function addCard(cardItem) {
  const card = createCard(cardItem);
  cardsList.addItem(card);
}

//  Открытие карточки на весь экран
const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

function imagePopupOpen(cardItem) {
  popupWithImage.open(cardItem);
}

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////

const userInfo = new UserInfo({
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__description'
  });

//  Открытие попапа по нажатию на кнопке редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit', (inputValues) => {
    userInfo.setUserInfo({
      'popup-name': inputValues['popup-name'],
      'popup-description': inputValues['popup-description']
    });

    editProfilePopup.close();
  });
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  profileFormValidator.enableSubmitButton();
  const userInfoData = userInfo.getUserInfo();
  editProfilePopup.setInputValues(userInfoData);
  editProfilePopup.open();
});

//  Открытие попапа по нажатию на кнопке добавления карточки [+]
const addCardPopup = new PopupWithForm('.popup_add', (inputValues) => {
  addCard(inputValues);
  addCardPopup.close();
});
addCardPopup.setEventListeners();
addButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormValidator.disableSubmitButton();
  addCardPopup.open();
});