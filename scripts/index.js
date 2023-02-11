import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import {
  initialCards, profilePopup, cardPopup, editButton, addButton, inputTopEdit, inputBottomEdit, validationConfig
}
from "./constants.js";
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';

//////////////////////////
//  Функционал страницы //
//////////////////////////

//  Добавление карточек при загрузке страницы
const cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (cardItem) => {
      const card = new Card(cardItem, '#card-item-template', () => imagePopupOpen(cardItem));
      cardsList.addItem(card.getView());
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
  const card = new Card(cardItem, '#card-item-template', () => imagePopupOpen(cardItem));
  cardsList.addItem(card.getView());
}

//  Открытие формы добавления карточки
function openCardPopup() {
  const popupWithForm = new PopupWithForm('.popup_add', (inputValues) => {
    addCard(inputValues);
    popupWithForm.close();
  });
  popupWithForm.open();
}

//  Открытие карточки на весь экран
function imagePopupOpen(cardItem) {
  const popupWithImage = new PopupWithImage('.popup_card', cardItem);
  popupWithImage.open();
}

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////

//  Обработка события submit формы добавления карточки

const userInfo = new UserInfo({
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__description'
  });

//  Открытие попапа по нажатию на кнопке редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit', (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues['popup-name'],
      description: inputValues['popup-description']
    });

    editProfilePopup.close();
  });
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  profileFormValidator.enableSubmitButton();
  const userInfoData = userInfo.getUserInfo();
  inputTopEdit.value = userInfoData['name'];
  inputBottomEdit.value = userInfoData['description'];

  editProfilePopup.open();
});

//  Открытие попапа по нажатию на кнопке добавления карточки [+]
const addCardPopup = new PopupWithForm('.popup_add', (inputValues) => {
  addCard(inputValues);
  addCardPopup.close();
});
addCardPopup.setEventListeners();
addButton.addEventListener('click', () => {

  addCardPopup.open();
});