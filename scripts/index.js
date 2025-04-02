// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCards(dataArray, cardTmp, container) {
    dataArray.forEach(element => {
      const cardElement = cardTmp.content.cloneNode(true);
      const cardTitle = cardElement.querySelector('.card__title');
      const cardImage = cardElement.querySelector('.card__image');
      const deleteButton = cardElement.querySelector('.card__delete-button');
      cardTitle.textContent = element.name;
      cardImage.src = element.link;
      deleteButton.addEventListener('click', deleteCard);
      container.append(cardElement); 
    });
}

// @todo: Функция удаления карточки
function deleteCard (event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove(); 
}

// @todo: Вывести карточки на страницу
createCards(initialCards, cardTemplate, cardsList);