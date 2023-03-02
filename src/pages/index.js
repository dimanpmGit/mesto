import '../pages/index.css';

import Api from '../scripts/Api.js';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import { config, profilePopup, cardPopup, editButton, addButton, validationConfig, avatarDoc, avatarPopupDoc }
from "../utils/constants.js";
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupForDelete from '../scripts/PopupForDelete.js';
import PopupWithAvatar from '../scripts/PopupWithAvatar.js';

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
      userAvatarSelector: '.profile__avatar-image'
      },
      data
    )
    
    // Запись данных о пользователе в профиль
    userInfo.setUserInfo();
    //  Открытие попапа по нажатию на кнопке редактирования профиля
    const editProfilePopup = new PopupWithForm('.popup_edit', (inputValues) => {
      editProfilePopup.renderLoading(true);
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
      .finally(() => {
        editProfilePopup.renderLoading(false);
      })

      userInfo.updateUserInfo({
        'popup-name': inputValues['popup-name'],
        'popup-description': inputValues['popup-description']
      })
    });
      
    editProfilePopup.setEventListeners();

    // Слушатель нажатия кнопки редактирования профиля
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
          addCardPopup.renderLoading(true);
          api.createCard(inputValues)
            .then((data) => {
              addCard(data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              addCardPopup.renderLoading(false);
            })
          addCardPopup.close();
        });

        // Слушатель нажатия кнопки [+]
        addCardPopup.setEventListeners();
        addButton.addEventListener('click', () => {
          cardFormValidator.resetValidation();
          cardFormValidator.disableSubmitButton();
          addCardPopup.open();
        });

        // Слушатель нажатия на аватар
        avatarDoc.addEventListener('click', () => {
          avatarModifyPopup.open();
        })

        // Создание попапа для обновления аватарки
        const avatarModifyPopup = new PopupWithAvatar('.popup_avatar', {
          handleUpdateAvatar: (linkObj) => {
            avatarModifyPopup.renderLoading(true);
            api.changeAvatar(linkObj)
              .then((answer) => {
                userInfo.setNewAvatar(answer.avatar);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                avatarModifyPopup.renderLoading(false);
              })
            avatarModifyPopup.close();
          }
        });
        avatarModifyPopup.setEventListeners();

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
              handleLikeCard: () => {
                api.likeCard(item._id)
                  .then((res) => {
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              },
              handleUnlikeCard: () => {
                api.unlikeCard(item._id)
                  .then((res) => {
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              },
              userId: userInfo.getUserId()
            });

          const cardElement = card.getView();
          return cardElement;
        }

        // Создание попапа для подтверждения удаления карточки
        const popupForDelete = new PopupForDelete('.popup_delete', {
          handleYesDelete: (card) => {
            popupForDelete.renderLoading(true);
              api.deleteCard(card._cardParams._id)
                .then(() => {
                  card.deleteCard();
                  popupForDelete.close();
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  popupForDelete.renderLoading(false);
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

//////////////////////////////////////////////////////////////////////////////
// Валидация форм                                                           //
//////////////////////////////////////////////////////////////////////////////
const profileFormValidator = new FormValidator(validationConfig, profilePopup);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardPopup);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarPopupDoc);
avatarFormValidator.enableValidation();

//  Открытие карточки на весь экран
const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

function imagePopupOpen(cardItem) {
  popupWithImage.open(cardItem);
}