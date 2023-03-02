import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, { handleUpdateAvatar }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._link = this._popupForm.querySelector('.popup__input');
    this._handleUpdateAvatar = handleUpdateAvatar;
    this._avatarLink = {}
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._avatarLink.avatar = this._link.value;
      this._handleUpdateAvatar(this._avatarLink);
    });
  }

  // Открытие попапа
  open(card) {
    super.open();
  }
  // Закрытие попапа
  close() {
    super.close();
  }
}