import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from '../utils/utils.js';
import {
  initialCards, profilePopup, cardPopup, profilePopupContainer, cardForm, cardPopupContainer, profileName, profileDesc, editButton, addButton, inputTopAdd, inputBottomAdd, inputTopEdit, inputBottomEdit, cardsContainer, buttonCloseList, validationConfig
}
from "./constants.js";

//////////////////////////
//  Функционал страницы //
//////////////////////////

//  Добавление карточки на страницу
const renderCard = (cardItem) => {
  const card = new Card(cardItem);
  cardsContainer.prepend(card.getView());
}

//  Добавление карточек при загрузке страницы
cardsContainer.append(...initialCards.map((cardItem) => {
  renderCard(cardItem);
}));

const profileFormValidator = new FormValidator(validationConfig, profilePopup);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardPopup);
cardFormValidator.enableValidation();

//  Добавление карточки
function addCard() {
  const cardItem = {
    name: inputTopAdd.value,
    link: inputBottomAdd.value
  };
  renderCard(cardItem);
}

//  Открытие формы изменения профиля
function openProfilePopup() {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  profileFormValidator.enableSubmitButton(profilePopup.querySelector(`${validationConfig.submitButtonSelector}`));
  openPopup(profilePopup);
}

//  Открытие формы добавления карточки
function openCardPopup() {
  cardForm.reset();
  cardFormValidator.disableSubmitButton(cardPopup.querySelector(`${validationConfig.submitButtonSelector}`));
  openPopup(cardPopup);
}

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////

//  Обработка события submit формы добавления карточки
cardPopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  addCard();
  closePopup(cardPopup);
});

//  Обработка события submit формы редактирования профиля
profilePopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = inputTopEdit.value;
  profileDesc.textContent = inputBottomEdit.value;
  closePopup(profilePopup);
});

//  Закрытие попапа по нажатию на кнопке крестик
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

//  Открытие попапа по нажатию на кнопке редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//  Открытие попапа по нажатию на кнопке добавления карточки [+]
addButton.addEventListener('click', openCardPopup);