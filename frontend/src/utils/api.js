class Api {
    constructor(option) {
        this._baseUrl = option.baseUrl; 
        this._headers = option.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // Получение информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
        })
        .then(res => this._checkResponse(res));
    }

    // Получение карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
        .then(res => this._checkResponse(res));
    }

    // Редактирование информации о пользователе
    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data)
        })
        .then(res => this._checkResponse(res));
    }

    // Добавление новой карточки через попап
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data)
        })
        .then(res => this._checkResponse(res));
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(res => this._checkResponse(res));
    }

    // Ставим и удаляем лайк
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
  
    // Редактирование аватара пользователя через попап
    editProfileAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => this._checkResponse(res));
  }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
    headers: {
      authorization: "3b6ba49e-c6c2-4141-aac3-86d97f08d7ae",
      "Content-Type": "application/json",
    },
  });

  export default api;
