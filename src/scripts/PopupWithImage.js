import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor( popupSelector ) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-name');
  }

  open(cardParams) {
    super.open();
    this._popupImage.setAttribute('src', cardParams.link);
    this._popupImage.setAttribute('alt', cardParams.name);
    this._popupImageName.textContent = cardParams.name;
  }
} 