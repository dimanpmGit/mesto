import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from '../utils/utils.js';
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
/*
//  Добавление карточки на страницу
const renderCard = (cardItem) => {
  const card = new Card(cardItem);
  cardsContainer.prepend(card.getView());
}

//  Добавление карточек при загрузке страницы
cardsContainer.append(...initialCards.map((cardItem) => {
  renderCard(cardItem);
}));*/

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
  //console.log(cardItem);
  /*const cardItem = {
    name: inputTopAdd.value,
    link: inputBottomAdd.value
  };*/

  const card = new Card(cardItem);
  cardsList.addItem(card.getView());
  //renderCard(cardItem);
}
/*
//  Открытие формы изменения профиля
function openProfilePopup() {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  profileFormValidator.enableSubmitButton();
  openPopup(profilePopup);
}
*/
//  Открытие формы добавления карточки
function openCardPopup() {
  const popupWithForm = new PopupWithForm('.popup_add', (inputValues) => {
    console.log(inputValues);
    addCard(inputValues);
    popupWithForm.close();
    
  });
  popupWithForm.open();
  //cardForm.reset();
  //cardFormValidator.disableSubmitButton();
  //openPopup(cardPopup);
  /*
  cardFormValidator.disableSubmitButton();
  const popupWithForm = new PopupWithForm('.popup_add', (inputValues) => {
    addCard(inputValues);

    popupWithForm.close();
  });
  popupWithForm.open();*/
}

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////

//  Обработка события submit формы добавления карточки

/*cardPopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
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
});*/
/*
//  Закрытие попапа по нажатию на кнопке крестик
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});*/

//  Открытие попапа по нажатию на кнопке редактирования профиля
//editButton.addEventListener('click', openProfilePopup);
editButton.addEventListener('click', () => {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  profileFormValidator.enableSubmitButton();
  const popupWithForm = new PopupWithForm('.popup_edit', () => {
    profileName.textContent = inputTopEdit.value;
    profileDesc.textContent = inputBottomEdit.value;
    popupWithForm.close();
  });
  popupWithForm.open();
});
let i = 0;
//  Открытие попапа по нажатию на кнопке добавления карточки [+]
addButton.addEventListener('click', () => {
  console.log(i);
  i++;
  openCardPopup();
});
/*
addButton.addEventListener('click', () => {
  //popupWithForm.setEventListeners();

});*/