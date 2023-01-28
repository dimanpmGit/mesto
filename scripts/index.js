import Card from './Card.js';
import FormValidator from './FormValidator.js';

//  Инициализация первых 6 карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const cardSubmitButton = cardForm.querySelector(`${validationConfig.submitButtonSelector}`);
const profileSubmitButton = profileForm.querySelector(`${validationConfig.submitButtonSelector}`);

//////////////////////////
//  Функционал страницы //
//////////////////////////

//  Добавление карточки на страницу
const renderCard = (cardItem) => {
  const card = new Card(cardItem);
  cardsContainer.prepend(card.getView());
  //cardsContainer.prepend(createCard(cardItem));
}

//  Добавление карточек при загрузке страницы
cardsContainer.append(...initialCards.map((cardItem) => {
  renderCard(cardItem);
}));

//  Закрытие формы/картинки нажатием клавиши [Esc]
function closePopupByEsc() {
  if (event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

//  Закрытие формы/картинки по клику вне формы/картинки
function closePopupByOutsideClick(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.currentTarget);
    }
  });
}

//  Открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  //  Слушатель события клика вне формы и закрытие попапа
  closePopupByOutsideClick(popup);
  //  При нажатии Esc закрыть попап
  page.addEventListener('keydown', closePopupByEsc);
}

//  Открытие формы изменения профиля
function openProfilePopup() {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  const profileFormValidator = new FormValidator(validationConfig, profilePopup);
  profileFormValidator.enableValidation();
  openPopup(profilePopup);
}

//  Открытие формы добавления карточки
function openCardPopup() {
  cardForm.reset();
  const cardFormValidator = new FormValidator(validationConfig, cardPopup);
  cardFormValidator.enableValidation();
  openPopup(cardPopup);
}

//  Открытие картинки карточки на весь экран
function openImagePopup(link, name) {
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageName.textContent = name;
  openPopup(imagePopup);
}

//  Добавление карточки
function addCard () {
  const cardItem = {
    name: inputTopAdd.value,
    link: inputBottomAdd.value
  };
  renderCard(cardItem);
}

//  Закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  //  Удаление слушателя нажатия Esc для закрытия попап
  page.removeEventListener('keydown', closePopupByEsc);
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

export { openImagePopup }