import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import {
  initialCards, profilePopup, cardPopup, profilePopupContainer, cardForm, 
  cardPopupContainer, profileName, profileDesc, editButton, addButton, inputTopAdd, 
  inputBottomAdd, inputTopEdit, inputBottomEdit, cardsContainer, buttonCloseList, validationConfig
}
from "./constants.js";
import PopupWithForm from './PopupWithForm.js';

//////////////////////////
//  Функционал страницы //
//////////////////////////

//  Добавление карточек при загрузке страницы
const cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (cardItem) => {
      const card = new Card(cardItem);
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
  const card = new Card(cardItem);
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

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////

//  Обработка события submit формы добавления карточки

//  Открытие попапа по нажатию на кнопке редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit', () => {
  profileName.textContent = inputTopEdit.value;
  profileDesc.textContent = inputBottomEdit.value;
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  profileFormValidator.enableSubmitButton();

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