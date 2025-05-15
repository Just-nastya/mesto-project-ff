//импртируем стили
import './pages/index.css';
//импртируем js
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';


//массив карточек
const initialCards = [
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

const cardsList = document.querySelector('.places__list');

//кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//модальные окна
const modals = document.querySelectorAll('.popup');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

//форма редактирвоания профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInputProfile = formEditProfile.querySelector('.popup__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//форма добавления карточки
const formNewCard = document.querySelector('form[name="new-place"]');
// Находим поля формы в DOM
const nameInputCard = formNewCard.querySelector('.popup__input_type_card-name');
const urlInputCard = formNewCard.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы редактирвоания профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); // Отменяет стандартную отправку формы.
    const name = nameInputProfile.value;
    const job = jobInputProfile.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closeModal(modalEditProfile);
}

// Обработчик «отправки» формы добавления картчоки
function handleFormCardSubmit(evt) {
    evt.preventDefault(); // Отменяет стандартную отправку формы.
    const cardElement = createCard(
      { 
        name: nameInputCard.value,
        link: urlInputCard.value
      },
      {
        deleteCard,
        likeCard,
        openModalImage
      }
    );
    cardsList.prepend(cardElement); 
    closeModal(modalAddCard);
    nameInputCard.value='';
    urlInputCard.value='';
}

// @todo: Прикрепляем обработчик к форме: “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormProfileSubmit);
formNewCard.addEventListener('submit', handleFormCardSubmit);

// @todo: Открываем модальное окно для редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  nameInputProfile.value = profileTitle.textContent;
  jobInputProfile.value = profileDescription.textContent;
  openModal(modalEditProfile);
});
buttonAddCard.addEventListener('click', function () {
  openModal(modalAddCard);
});

// @todo: Открываем модальное окно с кратинкой
function openModalImage (cardTitle , cardImg) {
    const modalTypeImage = document.querySelector('.popup_type_image');
    const dataImage = modalTypeImage.querySelector('.popup__image');
    const titleImage = modalTypeImage.querySelector('.popup__caption');
    dataImage.alt = cardTitle;
    dataImage.src= cardImg;
    titleImage.textContent = cardTitle;
    openModal(modalTypeImage);
}

// @todo: Слушателель закрытия модальных окон
modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  })
})


// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
     const cardElement = createCard(
      element,
      {
        deleteCard,
        likeCard,
        openModalImage
      }
    );
    cardsList.append(cardElement); 
});

