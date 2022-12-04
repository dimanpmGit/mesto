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
    console.log({element});
  });
})
//addEventListener('click', changeHeart);

function changeHeart(element) {
  //event.preventDefault();
  //console.log({element});
  /*
  elementHeart.classList.forEach(element => {
    console.log(`classList.element = ${element}`);
  });*/
  /*
  let arrElements = elementHeart.classList;
  console.log(arrElements.contains('link'));*/
  //console.log({elementHeart.classList});
}