const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '6f70953c-9f8b-4632-8131-9b1d1462f41f',
    'Content-Type': 'application/json'
  }
}

function checkResponse(getRes) {
  if (getRes.ok) {
    return getRes.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${getRes.status}`);
};

//Загрузка информации о пользователе с сервера
export const getNameProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        const resultUser = res.json();
        return resultUser;
      }
       // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.log(err))
    .finally(res => {return res});
};

//Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        const resultCards = res.json();
        return resultCards;
      }

       // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.log(err))
    .finally(res => {return res});
};

//Редактирование профиля
export const patchNameProfile = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  });
};

//Добавление новой карточки
export const postNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => checkResponse(res))
  .catch(err => console.log(err))
};

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
  .catch(err => console.log(err))
};

//Добавление лайка карточки
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
  .catch(err => console.log(err))
};

//Добавление лайка карточки
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
  .catch(err => console.log(err))
};

//Редактирование аватара
export const editAvatar = (avatarUrl) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then((res) => checkResponse(res))
  .catch(err => console.log(err))
};