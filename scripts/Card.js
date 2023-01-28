import { openImagePopup } from "../utils/utils.js";

class Card {
  constructor(initialCardElement, cardTemplateSelector){
    this._cardParams = initialCardElement;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  ////////////////////////////////
  // Получение шаблона карточки //
  ////////////////////////////////
  _getTemplate(){
    const card = document
      .querySelector('#card-item-template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }

  ///////////////////////////////////////////////
  //  Присваивание значений элементам карточки //
  ///////////////////////////////////////////////
  _setData(){
    const cardName = this._newCard.querySelector('.element__name');
    cardName.textContent = this._cardParams.name;

    const cardImage = this._newCard.querySelector('.element__image');
    cardImage.setAttribute('src', this._cardParams.link);
    cardImage.setAttribute('alt', this._cardParams.name);
  }

  ////////////////////
  //  Лайк карточки //
  ////////////////////
  _likeCard(){
    const heartButton = this._newCard.querySelector('.element__heart-button');
    heartButton.classList.toggle('element__heart-button_active');
  }

  ///////////////////////
  // Удаление карточки //
  ///////////////////////
  _deleteCard(){
    this._newCard.remove();
    this._newCard = null;
  }
    
  //////////////////////////////////
  //  Обработка событий карточки  //
  //////////////////////////////////
  _setEventListeners(){
    //  Лайк карточки
    const heartButton = this._newCard.querySelector('.element__heart-button');
    heartButton.addEventListener('click', () => this._likeCard());

    //  Удаление карточки
    const trashButton = this._newCard.querySelector('.element__trash-button');
    trashButton.addEventListener('click', () => this._deleteCard());

    //  Просмотр фотографии карточки
    const cardImage = this._newCard.querySelector('.element__image');
    cardImage.addEventListener('click', () => openImagePopup(this._cardParams.link, this._cardParams.name));
  }

  //  Создание одной карточки
  getView(){
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}

export default Card;