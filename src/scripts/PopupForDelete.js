import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(event);
    });
  }

  // Закрытие попапа
  close() {
    super.close();
  }
}