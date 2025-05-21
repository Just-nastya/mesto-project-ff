// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export function createCard(myId, cardData, { likeCard, openModalDelete, openModalImage } = {}) {
      const cardElement = cardTemplate.content.cloneNode(true);
      const cardItem = cardElement.querySelector('.card');
      const cardId = cardData._id;
      const cardTitle = cardElement.querySelector('.card__title');
      const cardImage = cardElement.querySelector('.card__image');
      const deleteButton = cardElement.querySelector('.card__delete-button');
      const likeButton = cardElement.querySelector('.card__like-button');
      const arrLikes = cardData.likes;
      const likes = cardElement.querySelector('.card__like-likes');
      cardTitle.textContent = cardData.name;
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      if (cardData.owner._id == myId) {
        deleteButton.classList.remove('card__delete-button_inactive');
      }     
      arrLikes.some((like) => {
        if(like._id == myId) {
          likeButton.classList.add('card__like-button_is-active');
        }
      });
      likes.textContent = arrLikes.length;
      likeButton.addEventListener('click', () => likeCard(likeButton, likes, cardId));
      deleteButton.addEventListener('click', () => openModalDelete(cardItem, cardId));
      cardImage.addEventListener('click', () => openModalImage(cardData.name, cardData.link));
      return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция для лайка
export function likeCard (event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button_is-active'); 
}