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

popup.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    handleFormSubmit(event);
  }
});