class Section {
  constructor( { item, renderer }, containerSelector ) {
    this._initialArray = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._initialArray.forEach((item) => {
      
    })
  }

  addItem(elemant) {
    this._container.append(element);
  }
}