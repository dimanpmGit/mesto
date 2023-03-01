const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'));
}

export default class Api {
  constructor(config) {
    this.url = config.url;
    this.urlForCards = `${this.url}/cards`;
    this.urlForUser = `${this.url}/users/me`;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.urlForUser, {
      headers: this.headers
    })
      .then(handleResponse)
  }

  updateUserInfo(data) {
    return fetch(
      this.urlForUser,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      }
    )
      .then(handleResponse)
  }

  getCardsData() {
    return fetch(this.urlForCards, {
      headers: this.headers
    })
      .then(handleResponse)
  }

  createCard(data) {
    return fetch(this.urlForCards, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this.urlForCards}/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(handleResponse)
  }

  likeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(handleResponse)
  }

  unlikeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(handleResponse)
  }
}