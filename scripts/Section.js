export default class Section {
  constructor( { items, renderer }, containerSelector ) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }

  //  Добавление карточки на страницу
  addItem(element) {
    this._container.append(element);
  }
}