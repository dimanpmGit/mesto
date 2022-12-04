const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupCover = document.querySelector('.popup__cover');
const popupName = popupForm.querySelector('.popup__name');
const popupDesc = popupForm.querySelector('.popup__description');
const profile = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const elementsHeart = document.querySelectorAll('.element__heart');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  console.log({profile});
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

popupCover.addEventListener('click', function(event) {
    if (!event.defaultPrevented) {
        closePopup();
    }
})

popupForm.addEventListener('click', function(event) {
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