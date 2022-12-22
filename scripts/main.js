/*
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupName = popupContainer.querySelector('.popup__input_type_name');
const popupDesc = popupContainer.querySelector('.popup__input_type_description');
const profile = document.querySelector('.profile');
*/
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const saveButton = document.querySelector('.popup__save-button');
//const closePopupButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


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

const cardsContainer = document.querySelector('.elements__list');

const createCard = (cardItem) => {
  /*
  const li = document.createElement('li');
  li.classList.add('element');
  const img = document.createElement('img');
  img.classList.add('element__image');
  img.setAttribute('src', cardLink);
  img.setAttribute('alt', cardName);
  const div = document.createElement('div');
  div.classList.add('element__info');
  const h2 = document.createElement('h2');
  h2.classList.add('element__name');
  h2.textContent = cardName;
  const button = document.createElement('button');
  button.classList.add('element__heart-button');
  button.setAttribute('type', 'button');
  div.append(h2, button);
  li.append(img, div);
  return li;*/
  const string = `<li class="element">
      <img class="element__image">
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
  name.textContent = cardItem.name;
  img.setAttribute('src', cardItem.link);
  img.setAttribute('alt', cardItem.name);
  heartButton.setAttribute('type', 'button');

  return container.firstElementChild;
}

const renderCard = (cardItem) => {
  cardsContainer.append(createCard(cardItem));
}

cardsContainer.append(...initialCards.map((item) => {
  return createCard(item);
}))

const initialPopups = [
  {
    type: 'popup__container_edit-profile',
    title: 'Редактировать профиль',
    buttonName: 'Сохранить',
    //initialiseInput: 'true',
    placeholderTop: 'Имя',
    placeholderBottom: 'Описание'
  },
  {
    type: 'popup__container_add-card',
    title: 'Новое место',
    buttonName: 'Сохранить',
    //initialiseInput: null,
    placeholderTop: 'Название',
    placeholderBottom: 'Ссылка на страницу'
  }
];

const popup = document.querySelector('.popup');

const createPopup = (popupItem) => {
  const string = `<div class="popup__container popup__container_hidden">
      <button class="popup__close-button link" type="button"></button>
      <h2 class="popup__title"></h2>
      <form class="popup__form" name="popup-form">
        <input class="popup__input popup__input_type_name" name="popup-name" type="text" placeholder="Имя">
        <input class="popup__input popup__input_type_description" name="popup-description" type="text"
          placeholder="Описание">
        <button class="popup__save-button" type="submit">Сохранить</button>
      </form>
    </div>`;
  const container = document.createElement('div');
  container.innerHTML = string;
  const popupContainer = container.querySelector('.popup__container');
  const title = container.querySelector('.popup__title');
  const inputTop = container.querySelector('.popup__input_type_name');
  const inputBottom = container.querySelector('.popup__input_type_description');
  popupContainer.setAttribute('id', popupItem.type);
  title.textContent = popupItem.title;
  inputTop.setAttribute('placeholder', popupItem.placeholderTop);
  inputBottom.setAttribute('placeholder', popupItem.placeholderBottom);

  return container.firstElementChild;
}

const renderPopup = (popupItem) => {
  popup.append(createPopup(popupItem));
}

popup.append(...initialPopups.map((item) => {
  return createPopup(item);
}))

const closePopupButtons = popup.querySelectorAll('.popup__close-button');
/*initialCards.forEach((item) => {
  renderCard(item.name, item.link);
})*/



function openPopup(event) {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
  if (event.target.className.includes('profile__edit-button')) {
    popup.querySelector('#popup__container_edit-profile').classList.remove('popup__container_hidden');
    //const inputTop = event.target.querySelector('.popup__input_type_name');
    //const inputBottom = event.target.querySelector('.popup__input_type_description');
    popup.querySelector('.popup__input_type_name').value = profileName.textContent;
    popup.querySelector('.popup__input_type_description').value = profileDesc.textContent;
    
  }
  else if (event.target.className.includes('profile__add-button')) {
    popup.querySelector('#popup__container_add-card').classList.remove('popup__container_hidden');
  }
  //const popupContainer = popup.querySelector('.popup__container');
  //popupContainer.classList.toggle('popup_hidden');
  //popupName.value = profileName.textContent;
  //popupDesc.value = profileDesc.textContent;
}

function closePopup() {
  popup.classList.toggle('popup_opened');
  popup.querySelectorAll('.popup__container').forEach(element => {
    element.classList.add('popup__container_hidden');
  });
}

// Находим форму в DOM
const formElements = document.querySelectorAll('.popup__form');// Воспользуйтесь методом querySelector()
/*
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
*/
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (event) {
  event.preventDefault();
  const inputTop = event.target.querySelector('.popup__input_type_name');
  const inputBottom = event.target.querySelector('.popup__input_type_description');
  if (event.target.parentElement.id === 'popup__container_edit-profile') {
    profileName.textContent = inputTop.value;
    profileDesc.textContent = inputBottom.value;
  }
  else if (event.target.parentElement.id === 'popup__container_add-card') {
    const cardItem = {
      name: inputTop.value,
      link: inputBottom.value
    }
    cardsContainer.prepend(createCard(cardItem));
  }
  inputTop.value = '';
  inputBottom.value = '';
  closePopup();
    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElements.forEach(element => {
  element.addEventListener('submit', handleFormSubmit);
});

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

closePopupButtons.forEach(element => {
  element.addEventListener('click', closePopup);
});