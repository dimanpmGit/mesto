import '../pages/index.css';

import Api from '../scripts/Api.js';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import { config, profilePopup, cardPopup, editButton, addButton, validationConfig }
from "../utils/constants.js";
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupForDelete from '../scripts/PopupForDelete.js';

//////////////////////////
//  Функционал страницы //
//////////////////////////

const api = new Api(config);
// Получение данных о пользователе и запись их в профиль
api.getUserInfo()
  .then((data) => {
    const userInfo = new UserInfo({
      userNameSelector: '.profile__name', 
      userInfoSelector: '.profile__description',
      userAvatarSelector: '.profile__avatar'
      },
      data
    )
    
    // Запись данных о пользователе в профиль
    userInfo.setUserInfo();
    //  Открытие попапа по нажатию на кнопке редактирования профиля
    const editProfilePopup = new PopupWithForm('.popup_edit', (inputValues) => {
      api.updateUserInfo({
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

    //  Добавление карточек при загрузке страницы
    api.getCardsData()
      .then((data) => {
        const cardsList = new Section({
          // Отображение вновь добавленной карточки первой
          items: data.reverse(),
          renderer: (cardItem) => {
            addCard(cardItem);
          }
        },
        '.elements__list'
        );
        cardsList.renderElements();

        //  Открытие попапа по нажатию на кнопке добавления карточки [+]
        const addCardPopup = new PopupWithForm('.popup_add', (inputValues) => {
          //  Добавление карточки
          api.createCard(inputValues)
            .then((data) => {
              addCard(data);
            })
            .catch((err) => {
              console.log(err);
            })
          addCardPopup.close();
        });

        addCardPopup.setEventListeners();
        addButton.addEventListener('click', () => {
          cardFormValidator.resetValidation();
          cardFormValidator.disableSubmitButton();
          addCardPopup.open();
        });

        function addCard(cardItem) {
          const card = createCard(cardItem);
          cardsList.renderElement(card);
        }

        // Создание новой карточки
        function createCard(item) {
            const card = new Card(item, '#card-item-template', {
              handleCardClick: () => {
                imagePopupOpen(item);
              }, 
              handleTrashClick: () => {
                deletePopupOpen(card);
              }, 
              userId: userInfo.getUserId()
            });

          const cardElement = card.getView();
          return cardElement;
        }

        // Создание попапа для подтверждения удаления карточки
        const popupForDelete = new PopupForDelete('.popup_delete', {
          handleYesDelete: (card) => {
              api.deleteCard(card._cardParams._id)
                .then(() => {
                  card.deleteCard();
                  popupForDelete.close();
                })
                .catch((err) => {
                  console.log(err);
                })
            }
        });
        popupForDelete.setEventListeners();
                  
        // Открытие попапа удаления карточки
        function deletePopupOpen(card) {
          popupForDelete.open(card);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  })
  .catch((err) => {
    console.log(err);
  })

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