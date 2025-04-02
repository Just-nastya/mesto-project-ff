// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
      const cardElement = cardTemplate.content.cloneNode(true);
      const cardTitle = cardElement.querySelector('.card__title');
      const cardImage = cardElement.querySelector('.card__image');
      const deleteButton = cardElement.querySelector('.card__delete-button');
      cardTitle.textContent = cardData.name;
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      deleteButton.addEventListener('click', deleteCard);
      return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove(); 
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    const cardElement = createCard(element, deleteCard);
    cardsList.append(cardElement); 
});