import { openModal } from './modal.js';

export const initialCards = [
    {
      name: "Архыз",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: "Челябинская область",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: "Иваново",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: "Камчатка",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: "Холмогорский район",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: "Байкал",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openModalImage) {
      const cardElement = cardTemplate.content.cloneNode(true);
      const cardTitle = cardElement.querySelector('.card__title');
      const cardImage = cardElement.querySelector('.card__image');
      const deleteButton = cardElement.querySelector('.card__delete-button');
      const likeButton = cardElement.querySelector('.card__like-button');
      cardTitle.textContent = cardData.name;
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      deleteButton.addEventListener('click', deleteCard);
      likeButton.addEventListener('click', likeCard);
      cardImage.addEventListener('click', openModalImage);
      return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard (event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove(); 
}

// @todo: Функция для лайка
export function likeCard (event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button_is-active'); 
}

// @todo: Функция для лайка
export function openModalImage (event) {
    const eventTarget = event.target;
    const modalTypeImage= document.querySelector('.popup_type_image');
    const dataImage = modalTypeImage.querySelector('.popup__image');
    const titleImage = modalTypeImage.querySelector('.popup__caption');
    dataImage.alt = eventTarget.alt;
    dataImage.src= eventTarget.src;
    titleImage.textContent = eventTarget.alt;
    openModal(modalTypeImage);
}