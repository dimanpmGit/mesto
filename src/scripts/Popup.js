export default class Popup {
  constructor( popupSelector ) {
    this._popup = document.querySelector(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__save-button');
    if (this._popupButton) {
      this._buttonText = this._popupButton.textContent;
    }
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
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');

    //  Удаление слушателя нажатия Esc для закрытия попап
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Отображение статуса загрузки
  renderLoading(isLoading) {
    const loadindText = 'Сохранение...';
    if (isLoading) {
      this._popupButton.textContent = loadindText;
    }
    else {
      this._popupButton.textContent = this._buttonText;
    }
  }
}