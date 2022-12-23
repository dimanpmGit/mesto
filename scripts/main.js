const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const templateEdit = document.querySelector('#popup-template-edit');
const templateAdd = document.querySelector('#popup-template-add');
const templateImage = document.querySelector('#popup-template-image');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const inputTopAdd = popupAdd.querySelector('.popup__input_type_top');
const inputBottomAdd = popupAdd.querySelector('.popup__input_type_bottom');
const popupEdit = document.querySelector('.popup_edit');
const inputTopEdit = popupEdit.querySelector('.popup__input_type_top');
const inputBottomEdit = popupEdit.querySelector('.popup__input_type_bottom');
const popupCard = document.querySelector('.popup_card');
const popupImage = popupCard.querySelector('.popup__image');
const popupImageName = popupCard.querySelector('.popup__image-name');
const cardsContainer = document.querySelector('.elements__list');

//Инициализировать первые 6 карточек
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

//  Создать одну карточку
const createCard = (cardItem) => {
  const string = `<li class="element">
      <img class="element__image">
      <button class="element__trash-button"></button>
      <div class="element__info">
        <h2 class="element__name"></h2>
        <button class="element__heart-button"></button>
      </div>
    </li>`;
  const container = document.createElement('div');
  container.innerHTML = string;

  const name = container.querySelector('.element__name');
  const img = container.querySelector('.element__image');
  const heartButton = container.querySelector('.element__heart-button');
  const trashButton = container.querySelector('.element__trash-button');
  const image = container.querySelector('.element__image');
  name.textContent = cardItem.name;
  img.setAttribute('src', cardItem.link);
  img.setAttribute('alt', cardItem.name);
  heartButton.setAttribute('type', 'button');

  //Обработка событий
  //  Лайк карточки
  heartButton.addEventListener('click', () => heartButton.classList.toggle('element__heart-button_active'));

  //  Удаление карточки
  trashButton.addEventListener('click', () => trashButton.parentElement.remove());
  //  Просмотр фотографии карточки
    image.addEventListener('click', () => {
    //renderPopupImage(templateImage);
    showPopup('popup_card');
  });

  //return container.firstElementChild;
  cardsContainer.prepend(container.firstElementChild);
}

const renderCard = (cardItem) => {
  cardsContainer.append(createCard(cardItem));
}

cardsContainer.append(...initialCards.map((item) => {
  return createCard(item);
}))

//  Создание попапов
//const popupContainerImage = template.content.querySelector('.popup__container_image').cloneNode(true);
const showPopup = (popupType) => {
//  const popupContainer = template.content.querySelector('.popup__container').cloneNode(true);
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
      console.log(popupContainer.querySelector('.popup__input_type_top'));
      const cardItem = {
        name: inputTopAdd.value,
        link: inputBottomAdd.value
      };
      createCard(cardItem);
      closePopup(popupAdd);
    });
  } 
  else if (popupType === 'popup_card') {
    popupImage.setAttribute('src', event.target.src);
    popupImage.setAttribute('alt', event.target.alt);
    popupImageName.textContent = event.target.closest('.element').querySelector('.element__name').textContent;
    popupCard.classList.add('popup_image');
    popupCard.classList.add('popup_opened');
    popupContainer = popupCard.querySelector('.popup__container_image');
    popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
      closePopup(popupCard);
    });
  }
  /*if (template.id === 'popup-template-edit') {
    inputTop.value = profileName.textContent;
    inputBottom.value = profileDesc.textContent;
  }*/
  /*
  //  Закрытие попап
  popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(popupContainer);
  });

  //  Изменение профиля
  popupContainer.querySelector('.popup__form').addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log(event.target.name);
    if (event.target.name === 'popup-form-edit') {
      profileName.textContent = inputTop.value;
      profileDesc.textContent = inputBottom.value;
    }
    else if (event.target.name === 'popup-form-add') {
      const cardItem = {
        name: inputTop.value,
        link: inputBottom.value
      }
      cardsContainer.prepend(createCard(cardItem));
    }
    closePopup(popupContainer);
  })
  //return popupContainer;
  */
  //  Закрытие попап
}

//  Попап просмотра картинки из карточки
/*const createPopupContainerImage = (template) => {
  const popupContainer = template.content.querySelector('.popup__container_image').cloneNode(true);
  popup.classList.add('popup_opened');
  popup.classList.add('popup_image');
  popupImage.setAttribute('src', event.target.src);
  popupImage.setAttribute('alt', event.target.alt);
  popupImageName.textContent = event.target.parentElement.querySelector('.element__name').textContent;

  //  Закрытие попап
  popupContainer.querySelector('.popup__close-button').addEventListener('click', () => {
    popup.classList.remove('popup_image');
    closePopup(popupContainer);
  });

  return popupContainer;
}*/


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
/*const closePopup = (el) => {
  popup.classList.remove('popup_opened');
  //  Задержка для плавного закрытия попапов
  setTimeout(() => {
    el.remove();
  }, 500);
}

const renderPopup = (template) => {
  popup.append(createPopupContainer(template));
}

const renderPopupImage = (template) => {
  popup.append(createPopupContainerImage(template));
}*/

//  Обработка событий страницы
editButton.addEventListener('click', () => {
  showPopup('popup_edit');
});

addButton.addEventListener('click', () => {
  showPopup('popup_add');
});