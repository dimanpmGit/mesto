const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popupName = popupContainer.querySelector('.popup__input_type_name');
const popupDesc = popupContainer.querySelector('.popup__input_type_description');
const profile = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const saveButton = document.querySelector('.popup__save-button');
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

const createCard = (cardName, cardLink) => {
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
  return li;
}

const renderCard = (cardName, cardLink) => {
  cardsContainer.append(createCard(cardName, cardLink));
}

cardsContainer.append(...initialCards.map((item) => {
  return createCard(item.name, item.link);
}))
/*initialCards.forEach((item) => {
  renderCard(item.name, item.link);
})*/

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
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
formElement.addEventListener('submit', handleFormSubmit); 

editButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);