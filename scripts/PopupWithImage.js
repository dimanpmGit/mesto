import Popup from "./Popup.js";
import { popupImage, popupImageName } from './constants.js';

export default class PopupWithImage extends Popup {
  constructor( popupSelector, cardParams ) {
    super(popupSelector);
    this._cardParams = cardParams;
  }

  open() {
    popupImage.setAttribute('src', this._cardParams.link);
    popupImageName.setAttribute('alt', this._cardParams.name);
    popupImage.textContent = this._cardParams.name;
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }
} 