import { page, buttonCloseList } from "../scripts/constants.js";

export default class Popup {
  constructor( popupSelector ) {
    this._popup = document.querySelector(popupSelector);
  }

  // Закрытие попапа клавишей Esc
  _handleEscClose = (event) => {
    if (event.code === 'Escape') {
      this.close();
    };
  }

  // Установка слушателей
  setEventListeners() {
    // Слушатель закрытия по нажатию на крестик
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));

    //  Слушатель события клика вне формы и закрытие попапа
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }

  // Открытие попапа
  open() {
    this._popup.classList.add('popup_opened');

    // Слушатель закрытия по нажатию кнопки Esc
    page.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');

    //  Удаление слушателя нажатия Esc для закрытия попап
    page.removeEventListener('keydown', this._handleEscClose);
  }
}