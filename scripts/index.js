const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const inputTopAdd = popupAdd.querySelector('.popup__input_type_top');
const inputBottomAdd = popupAdd.querySelector('.popup__input_type_bottom');
const popupEdit = document.querySelector('.popup_edit');
const inputTopEdit = popupEdit.querySelector('.popup__input_type_top');
const inputBottomEdit = popupEdit.querySelector('.popup__input_type_bottom');
const popupCard = document.querySelector('.popup_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupImageName = popupCard.querySelector('.popup__image-name');
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
  trashButton.addEventListener('click', () => trashButton.closest('.element').remove());
  
  //  Просмотр фотографии карточки
  image.addEventListener('click', () => {
    showPopup('popup_image');
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
    popupEdit.classList.add('popup_opened');
    let popupContainer = popupEdit.querySelector('.popup__container');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(popupEdit);
    });
    //  Изменение профиля
    popupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      profileName.textContent = popupContainer.querySelector('.popup__input_type_top').value;
      profileDesc.textContent = popupContainer.querySelector('.popup__input_type_bottom').value;
      closePopup(popupEdit);
    });
  }
  else if (popupType === 'popup_add') {
    popupAdd.classList.add('popup_opened');
    let popupContainer = popupAdd.querySelector('.popup__container');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(popupAdd);
      inputTopAdd.value = '';
      inputBottomAdd.value = '';
    });
    //  Добавление карточки
    popupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      const cardItem = {
        name: inputTopAdd.value,
        link: inputBottomAdd.value
      };
      renderCard(cardItem);
      closePopup(popupAdd);
    });
  } 
  else if (popupType === 'popup_image') {
    popupImage.setAttribute('src', event.target.src);
    popupImage.setAttribute('alt', event.target.alt);
    popupImageName.textContent = event.target.closest('.element').querySelector('.element__name').textContent;
    popupCard.classList.add('popup_opened');
    popupContainer = popupCard.querySelector('.popup__container_image');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(popupCard);
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