// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export function createCard(cardData, { deleteCard, likeCard, openModalImage } = {}) {
      const cardElement = cardTemplate.content.cloneNode(true);
      const cardItem = cardElement.querySelector('.card');
      const cardTitle = cardElement.querySelector('.card__title');
      const cardImage = cardElement.querySelector('.card__image');
      const deleteButton = cardElement.querySelector('.card__delete-button');
      const likeButton = cardElement.querySelector('.card__like-button');
      cardTitle.textContent = cardData.name;
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      deleteButton.addEventListener('click', () => deleteCard(cardItem));
      likeButton.addEventListener('click', likeCard);
      cardImage.addEventListener('click', () => openModalImage(cardData.name, cardData.link));
      return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция для лайка
export function likeCard (event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button_is-active'); 
}