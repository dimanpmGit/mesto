const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_card');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profileForm = profilePopup.querySelector('.popup__form');
const cardForm = cardPopup.querySelector('.popup__form');
const cardPopupContainer = cardPopup.querySelector('.popup__container');
const imagePopupContainer = imagePopup.querySelector('.popup__container-image');
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
const template = document.querySelector('#card-item-template');
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

//  Создать одну карточку
const createCard = (cardItem) => {
  const card = template.content.querySelector('.element').cloneNode(true);
  const name = card.querySelector('.element__name');
  const heartButton = card.querySelector('.element__heart-button');
  const trashButton = card.querySelector('.element__trash-button');
  const image = card.querySelector('.element__image');
  name.textContent = cardItem.name;
  image.setAttribute('src', cardItem.link);
  image.setAttribute('alt', cardItem.name);

  //Обработка событий
  //  Лайк карточки
  heartButton.addEventListener('click', () => heartButton.classList.toggle('element__heart-button_active'));

  //  Удаление карточкиclosest
  trashButton.addEventListener('click', () => card.remove());

  //  Просмотр фотографии карточки
  image.addEventListener('click', () => openImagePopup(cardItem.link, cardItem.name));
  return card;
}

const renderCard = (cardItem) => {
  cardsContainer.prepend(createCard(cardItem));
}

cardsContainer.append(...initialCards.map(createCard));

function closePopupByEsc() {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.code === 'Escape') {
    closePopup(openedPopup);
  };
}

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

enableValidation(validationConfig);

//  Открытие формы изменения профиля
function openProfilePopup() {
  profileForm.reset();
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  openPopup(profilePopup);
  enableSubmitButton(profileSubmitButton, validationConfig);
}

function openCardPopup() {
  cardForm.reset();
  openPopup(cardPopup);
  disableSubmitButton(cardSubmitButton, validationConfig);
}

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

//  Обработка событий страницы
cardPopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  addCard();
  closePopup(cardPopup);
});

profilePopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = inputTopEdit.value;
  profileDesc.textContent = inputBottomEdit.value;
  closePopup(profilePopup);
});

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', openProfilePopup);

addButton.addEventListener('click', openCardPopup);