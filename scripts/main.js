const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupCover = document.querySelector('.popup__cover');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
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