import Popup from "./Popup.js";
import { popupImage, popupImageName } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor( popupSelector, cardParams ) {
    super(popupSelector);
    this._cardParams = cardParams;
  }

  open() {
    super.open();
    popupImage.setAttribute('src', this._cardParams.link);
    popupImage.setAttribute('alt', this._cardParams.name);
    popupImageName.textContent = this._cardParams.name;
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }
} 