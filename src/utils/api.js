class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return this._request(`${this._url}/users/me`, {
        headers: this._headers
    })
  }

  setProfileInfo(data) {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  setCard(data) {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  changeAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  toggleLikeCard(id, isLiked) {
    if (isLiked) {
      return this.like(id);
    } else {
      return this.dislike(id);
    }
  }

  like(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
  }

  dislike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    'Content-Type': 'application/json',
    authorization: '318c6aa2-d252-473c-b9e5-2476fdd291ae'
  }
})

export {api}
