class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((result) => this._checkResponse(result));
  }

  setUserInfo(username, userJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: userJob,
      }),
    }).then((result) => this._checkResponse(result));
  }

  setProfileImage(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((result) => this._checkResponse(result));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((result) => this._checkResponse(result));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => this._checkResponse(result));
  }

  addRemoveLike(id, isliked) {
    if (isliked) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((result) => this._checkResponse(result));
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((result) => this._checkResponse(result));
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => this._checkResponse(result));
  }

  _checkResponse(result) {
    if (result.ok) return result.json();

    return Promise.reject(`Error: ${result.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "7c286de8-6d0b-40ef-bc6e-36b7a6f017e2",
    "Content-Type": "application/json",
  },
});
