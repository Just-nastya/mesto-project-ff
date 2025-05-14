//импртируем стили
import './pages/index.css';
//импртируем js
import { initialCards, createCard, deleteCard, likeCard, openModalImage } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';


//массив карточек
const cardsList = document.querySelector('.places__list');

//кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//модальные окна
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
    const cardData = {
     name: nameInputCard.value,
     link: urlInputCard.value
    }
    const cardElement = createCard(cardData, deleteCard, likeCard, openModalImage);
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

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    const cardElement = createCard(element, deleteCard, likeCard, openModalImage);
    cardsList.append(cardElement); 
});

