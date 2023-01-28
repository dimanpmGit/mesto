import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openProfilePopup, openCardPopup, closePopup } from '../utils/utils.js';
import {
  initialCards, profilePopup, cardPopup, profilePopupContainer, cardPopupContainer, profileName, profileDesc, 
  editButton, addButton, inputTopEdit, inputBottomEdit, cardsContainer, buttonCloseList, validationConfig, inputTopAdd, inputBottomAdd
}
from "./constants.js";

//const cardSubmitButton = cardForm.querySelector(`${validationConfig.submitButtonSelector}`);
//const profileSubmitButton = profileForm.querySelector(`${validationConfig.submitButtonSelector}`);

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