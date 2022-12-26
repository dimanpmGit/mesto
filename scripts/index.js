const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_card');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const inputTopAdd = cardPopup.querySelector('.popup__input_type_top');
const inputBottomAdd = cardPopup.querySelector('.popup__input_type_bottom');
const inputTopEdit = profilePopup.querySelector('.popup__input_type_top');
const inputBottomEdit = profilePopup.querySelector('.popup__input_type_bottom');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-name');
const cardsContainer = document.querySelector('.elements__list');
const template = document.querySelector('#card-item-template');

//  Создать одну карточку
const createCard = (cardItem) => {
  const card = template.content.querySelector('.element').cloneNode(true);
  const name = card.querySelector('.element__name');
  const img = card.querySelector('.element__image');
  const heartButton = card.querySelector('.element__heart-button');
  const trashButton = card.querySelector('.element__trash-button');
  const image = card.querySelector('.element__image');

  name.textContent = cardItem.name;
  img.setAttribute('src', cardItem.link);
  img.setAttribute('alt', cardItem.name);
  heartButton.setAttribute('type', 'button');

  //Обработка событий
  //  Лайк карточки
  heartButton.addEventListener('click', () => heartButton.classList.toggle('element__heart-button_active'));

  //  Удаление карточки
  trashButton.addEventListener('click', () => card.remove());
  
  //  Просмотр фотографии карточки
  image.addEventListener('click', () => {
    showPopup('popup_card');
  });
  return card;
}

const renderCard = (cardItem) => {
  cardsContainer.prepend(createCard(cardItem));
}

cardsContainer.append(...initialCards.reverse().map((item) => {
  return renderCard(item);
}));

//  Создание попапов
const showPopup = (popupType) => {
  if (popupType === 'popup_edit') {
    inputTopEdit.value = profileName.textContent;
    inputBottomEdit.value = profileDesc.textContent;
    profilePopup.classList.add('popup_opened');
    const popupContainer = profilePopup.querySelector('.popup__container');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(profilePopup);
    });
    //  Изменение профиля
    popupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      profileName.textContent = popupContainer.querySelector('.popup__input_type_top').value;
      profileDesc.textContent = popupContainer.querySelector('.popup__input_type_bottom').value;
      closePopup(profilePopup);
    });
  }
  else if (popupType === 'popup_add') {
    cardPopup.classList.add('popup_opened');
    const cardPopupContainer = cardPopup.querySelector('.popup__container');
    cardPopupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(cardPopup);
      inputTopAdd.value = '';
      inputBottomAdd.value = '';
    });
    //  Добавление карточки
    cardPopupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      const cardItem = {
        name: inputTopAdd.value,
        link: inputBottomAdd.value
      };
      renderCard(cardItem);
      closePopup(cardPopup);
    });
  } 
  else if (popupType === 'popup_card') {
    popupImage.setAttribute('src', event.target.src);
    popupImage.setAttribute('alt', event.target.alt);
    popupImageName.textContent = event.target.closest('.element').querySelector('.element__name').textContent;
    imagePopup.classList.add('popup_opened');
    popupContainer = imagePopup.querySelector('.popup__container-image');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(imagePopup);
    });
  }
}

//  Закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  if (popup.classList.value.includes('popup_add')) {
    setTimeout(() => {
      popup.querySelector('.popup__input_type_top').value = '';
      popup.querySelector('.popup__input_type_bottom').value = '';
    }, 500);
  }
}

//  Обработка событий страницы
editButton.addEventListener('click', () => {
  showPopup('popup_edit');
});

addButton.addEventListener('click', () => {
  showPopup('popup_add');
});