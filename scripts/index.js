const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_card');
const profilePopupContainer = profilePopup.querySelector('.popup__container');
const profileForm = profilePopup.querySelector('.popup__form');
const cardForm = cardPopup.querySelector('.popup__form');
/*const profileSaveButton = profileForm.querySelector('.popup__save-button');
const profileInputs = profilePopup.querySelectorAll('.popup__input');
const cardSaveButton = cardForm.querySelector('.popup__save-button');
const cardInputs = cardPopup.querySelectorAll('.popup__input');*/
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

  //  Удаление карточки
  trashButton.addEventListener('click', () => card.remove());

  //  Просмотр фотографии карточки
  image.addEventListener('click', () => openImagePopup(cardItem.link, cardItem.name));
  return card;
}

const renderCard = (cardItem) => {
  cardsContainer.prepend(createCard(cardItem));
}

cardsContainer.append(...initialCards.map((item) => {
  return createCard(item);
}));

//  Открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

//  Открытие формы изменения профиля
function openProfilePopup() {
  inputTopEdit.value = profileName.textContent;
  inputBottomEdit.value = profileDesc.textContent;
  //  Изменение профиля
  openPopup(profilePopup);
  checkForm(profileForm);
}

function openCardPopup() {
  inputTopAdd.value = '';
  inputBottomAdd.value = '';
  openPopup(cardPopup);
  checkForm(cardForm);
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

//  Закрыть попап по клику вне формы
const popupArr = Array.from(popups);
popupArr.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (!evt.defaultPrevented) {
      closePopup(popup);
    }
  });
  popup.querySelector('.popup__container').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  page.addEventListener('keydown', (evt) => {
    const popupsArr = Array.from(popups);
    popupsArr.forEach((popup) => {
      if (evt.keyCode === 27) {
        closePopup(popup);
      }
    })
  });
});