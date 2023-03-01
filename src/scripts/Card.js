export default class Card {
  constructor(initialCardElement, cardTemplateSelector, { handleCardClick, handleTrashClick, userId}){
    this._cardParams = initialCardElement;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._userId = userId;
    this._id = initialCardElement._id;
    'owner' in this._cardParams ? this._cardOwnerId = this._cardParams.owner._id : this._cardOwnerId = this._userId;
  }

  ////////////////////////////////
  // Получение шаблона карточки //
  ////////////////////////////////
  _getTemplate() {
    const card = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }

  ///////////////////////////////////////////////
  //  Присваивание значений элементам карточки //
  ///////////////////////////////////////////////
  _setData(){
    this._cardName.textContent = this._cardParams.name;
    this._cardImage.setAttribute('src', this._cardParams.link);
    this._cardImage.setAttribute('alt', this._cardParams.name);
    this._cardParams.likes ? (this._cardLikes.textContent = this._cardParams.likes.length):(this._cardLikes.textContent = 0);
  }

  ////////////////////
  //  Лайк карточки //
  ////////////////////
  _likeCard(){
    this._heartButton.classList.toggle('element__heart-button_active');
  }

  ///////////////////////
  // Удаление карточки //
  ///////////////////////
  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }
    
  //////////////////////////////////
  //  Обработка событий карточки  //
  //////////////////////////////////
  _setEventListeners(){
    //  Лайк карточки
    this._heartButton.addEventListener('click', () => this._likeCard());

    //  Удаление карточки
    if (this._cardOwnerId === this._userId) {
      this._trashButton.classList.add('element__trash-button_type_visible');
      this._trashButton.addEventListener('click', () => this._handleTrashClick());
    }

    //  Просмотр фотографии карточки
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  //  Создание одной карточки
  getView(){
    this._newCard = this._getTemplate();
    this._cardImage = this._newCard.querySelector('.element__image');
    this._cardName = this._newCard.querySelector('.element__name');
    this._cardLikes = this._newCard.querySelector('.element__heart-likes');
    this._heartButton = this._newCard.querySelector('.element__heart-button');
    this._trashButton = this._newCard.querySelector('.element__trash-button');
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}