import '../pages/index.css';

import Api from '../scripts/Api.js';
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

const token = '795d4992-334e-420a-88f5-63bf4e3c7168';
const cardsConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60/cards',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

const userGetConfig = {
  url: 'https://nomoreparties.co/v1/cohort-60/users/me',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

const userUpdateConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60/users/me',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

const apiCards = new Api(cardsConfig);
const apiGetUserInfo = new Api(userGetConfig);
const apiSetUserInfo = new Api(userUpdateConfig);

//  Добавление карточек при загрузке страницы
apiCards.getInfo()
  .then((data) => {
    const cardsList = new Section({
      // Отображение вновь добавленной карточки первой
      items: data.reverse(),
      renderer: (cardItem) => {
        const card = createCard(cardItem);
        cardsList.addItem(card);
      }
    },
    '.elements__list'
    );
    cardsList.renderElements();

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
    
    //  Добавление карточки
    function addCard(cardItem) {
      const card = createCard(cardItem);
      cardsList.addItem(card);
      apiCards.createCard(cardItem)
        .then(() => {
          //console.log(data);
          //cardsList.renderElements();
        })
        .catch((err) => {
          console.log(err);
        })
    }

    // Создание новой карточки
    function createCard(item) {
      const card = new Card(item, '#card-item-template', () => imagePopupOpen(item));
      const cardElement = card.getView();
      return cardElement;
    }
  })
  .catch((err) => {
    console.log(err);
  })

// Получение данных о пользователе и запись их в профиль
apiGetUserInfo.getInfo()
  .then((data) => {
    const userInfo = new UserInfo({
      userNameSelector: '.profile__name', 
      userInfoSelector: '.profile__description',
      userAvatarSelector: '.profile__avatar',
      data
    })

    // Запись данных о пользователе в профиль
    userInfo.setUserInfo();
    //  Открытие попапа по нажатию на кнопке редактирования профиля
    const editProfilePopup = new PopupWithForm('.popup_edit', (inputValues) => {
      apiSetUserInfo.updateInfo({
        'name': inputValues['popup-name'],
        'about': inputValues['popup-description']
      })
      .then(() => {
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })

      userInfo.updateUserInfo({
        'popup-name': inputValues['popup-name'],
        'popup-description': inputValues['popup-description']
      })
    });
    editProfilePopup.setEventListeners();

    editButton.addEventListener('click', () => {
      profileFormValidator.resetValidation();
      profileFormValidator.enableSubmitButton();
      const userInfoData = userInfo.getUserInfo();
      editProfilePopup.setInputValues(userInfoData);
      editProfilePopup.open();
    });
  })
  .catch((err) => {
    console.log(err);
  })

// Добавление карточки по нажатию конпки [+]
/*
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

cardsList.renderElements();*/

const profileFormValidator = new FormValidator(validationConfig, profilePopup);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardPopup);
cardFormValidator.enableValidation();

//  Открытие карточки на весь экран
const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

function imagePopupOpen(cardItem) {
  popupWithImage.open(cardItem);
}

//////////////////////////////////
//  Обработка событий страницы  //
//////////////////////////////////
/*
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
});*/
/*
// Подключение к серверу
fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
  headers: {
    authorization: '795d4992-334e-420a-88f5-63bf4e3c7168'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })

  // Загрузка информации о пользователе с сервера
  fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
    headers: {
      authorization: '795d4992-334e-420a-88f5-63bf4e3c7168'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })*/