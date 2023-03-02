import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, { handleYesDelete }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formSubmiter = handleYesDelete;
    this._card = {};
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(event);
      this._formSubmiter(this._card);
    });
  }

  open(card) {
    super.open();
    this._card = card;
  }
}