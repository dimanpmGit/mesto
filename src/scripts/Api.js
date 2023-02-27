const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'));
}

export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInfo() {
    return fetch(this.url, {
      headers: this.headers
    })
      .then(handleResponse)
  }

  updateInfo(data) {
    return fetch(
      this.url,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      }
    )
      .then(handleResponse)
  }

  createCard(data) {
    return fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(handleResponse)
  }
}