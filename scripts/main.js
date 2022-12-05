const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popupName = popupContainer.querySelector('.popup__name');
const popupDesc = popupContainer.querySelector('.popup__description');
const profile = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const elementsHeart = document.querySelectorAll('.element__heart-button');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
    if (!event.defaultPrevented) {
        closePopup();
    }
})

popupContainer.addEventListener('click', function(event) {
    event.preventDefault();
})

elementsHeart.forEach(element => {
  element.addEventListener('click', function(event){
    event.preventDefault();
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      element.setAttribute('src', './images/heart.svg');
    } else {
      element.classList.add('active');
      element.setAttribute('src', './images/heart-active.svg');
    }
  });
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDesc.textContent = popupDesc.value;
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
saveButton.addEventListener('click', handleFormSubmit); 
popup.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    handleFormSubmit(event);
  }
});