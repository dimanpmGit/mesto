import { 
  page, profilePopup, cardPopup, imagePopup, cardForm, profileName, profileDesc, inputTopAdd, inputBottomAdd, inputTopEdit, inputBottomEdit, popupImage, popupImageName
 } 
 from "../scripts/constants.js";

//  Закрытие формы/картинки нажатием клавиши [Esc]
function closePopupByEsc() {
  if (event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function closePopupByOutsideClick(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.removeEventListener('click', setOutsideClickListener);
    closePopup(evt.currentTarget);
  }
}

//  Закрытие формы/картинки по клику вне формы/картинки
function setOutsideClickListener(popup) {
  popup.addEventListener('click', closePopupByOutsideClick);
}

//  Открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  //  Слушатель события клика вне формы и закрытие попапа
  setOutsideClickListener(popup);
  //  При нажатии Esc закрыть попап
  page.addEventListener('keydown', closePopupByEsc);
}

//  Открытие формы изменения профиля
function openProfilePopup() {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  openPopup(profilePopup);
}

//  Открытие формы добавления карточки
function openCardPopup() {
  cardForm.reset();
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
function addCard() {
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

export { openProfilePopup, openCardPopup, addCard, closePopup, openImagePopup };