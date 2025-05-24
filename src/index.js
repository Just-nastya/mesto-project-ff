//импртируем стили
import './pages/index.css';
//импртируем js
import { createCard, removeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getNameProfile, getInitialCards, patchNameProfile, postNewCard, deleteCard, addLikeCard, deleteLikeCard, editAvatar } from './components/api.js'

const cardsList = document.querySelector('.places__list');

//кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

//модальные окна
const modals = document.querySelectorAll('.popup');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalDelete = document.querySelector('.popup_type_delete');
const modalAvatar = document.querySelector('.popup_type_edit-avatar');

//форма редактирвоания профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInputProfile = formEditProfile.querySelector('.popup__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__image-edit-button');

//форма добавления карточки
const formNewCard = document.querySelector('form[name="new-place"]');
// Находим поля формы в DOM
const nameInputCard = formNewCard.querySelector('.popup__input_type_card-name');
const urlInputCard = formNewCard.querySelector('.popup__input_type_url');

//форма удаления
const formDelete = document.querySelector('form[name="delete"]');

//форма для смены аватара
const formAvatar = document.querySelector('form[name="edit-avatar"]');
const avatarInputProfile = formAvatar.querySelector('.popup__input_type_url');

//настройка валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);  

// Обработчик «отправки» формы редактирвоания профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); // Отменяет стандартную отправку формы.
    const button = formEditProfile.querySelector('.popup__button');
    const name = nameInputProfile.value;
    const job = jobInputProfile.value;
    setSavingState(button);
    patchNameProfile(name, job)
    .then(result => {
      profileTitle.textContent = name;
      profileDescription.textContent = job;
      closeModal(modalEditProfile);
    })
    .catch(err => console.log(err))  
    .finally(() => {
     setInitialSaveState(button);
   });  
};

// Обработчик «отправки» формы добавления картчоки
function handleFormCardSubmit(myId) {
  const button = formNewCard.querySelector('.popup__button');
  setSavingState(button);
  postNewCard(nameInputCard.value, urlInputCard.value)
   .then(result => {
    const cardElement = createCard(
    myId,
    result,
    {
      likeCard,
      openModalDelete,
      openModalImage
    }
  ); 
  cardsList.prepend(cardElement); 
  closeModal(modalAddCard);
  })
  .catch(err => console.log(err))
  .finally(() => {
     setInitialSaveState(button);
   });  
};

// @todo: Открываем модальное окно для редактирования профиля
buttonEditProfile.addEventListener('click', function () { 
  nameInputProfile.value = profileTitle.textContent;
  jobInputProfile.value = profileDescription.textContent;
  openModal(modalEditProfile);
  clearValidation(formEditProfile, validationConfig); 
});

// @todo: Открываем модальное окно для добавления карточки
buttonAddCard.addEventListener('click', function () {
  nameInputCard.value='';
  urlInputCard.value='';
  openModal(modalAddCard);
  clearValidation(formNewCard, validationConfig); 
});

function setSavingState(button) {
    button.textContent = 'Сохранение...';
}

function setInitialSaveState(button) {
    button.textContent = 'Сохранить';
}

function setSavingDeleteButton(button) {
    button.textContent = 'Удаление...';
}

function setInitialDeleteButton(button) {
    button.textContent = 'Да';
}

function refreshLikes(likeCountElement, responce) {
    if (responce && responce.likes) {
        likeCountElement.textContent = responce.likes.length;
    }
}

function likeCard(likeButton, likes, cardId) {
   if (likeButton.classList.contains('card__like-button_is-active')) {
        deleteLikeCard(cardId)
        .then(result => {
          refreshLikes(likes, result);
          likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
    } else {
        addLikeCard(cardId)
        .then(result => {
          refreshLikes(likes, result);
          likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
    }
}

// @todo: Открываем модальное окно с картинкой
function openModalImage (cardTitle , cardImg) {
    const modalTypeImage = document.querySelector('.popup_type_image');
    const dataImage = modalTypeImage.querySelector('.popup__image');
    const titleImage = modalTypeImage.querySelector('.popup__caption');
    dataImage.alt = cardTitle;
    dataImage.src= cardImg;
    titleImage.textContent = cardTitle;
    openModal(modalTypeImage);
};


let card;
let idCard;

// @todo: Открываем модальное окно с подтверждением удаления
function openModalDelete(cardItem, cardId) {
    card = cardItem;
    idCard = cardId;
    openModal(modalDelete);
};

formDelete.addEventListener('submit',  function (evt) {
  evt.preventDefault(); 
  handleDeleteCardSubmit(card, idCard);
});

//нажимаем на редактирвоание аватара
profileEditButton.addEventListener('click', () => {
    avatarInputProfile.value='';
    clearValidation(formAvatar, validationConfig);
    openModal(modalAvatar);
});

let avatarUrl;

formAvatar.addEventListener('submit',  function (evt) {
      evt.preventDefault();
      avatarUrl = avatarInputProfile.value;
      handleAvatarSubmit(avatarUrl);
});


// @todo: Подтверждаем удаление
function handleDeleteCardSubmit(card, idCard) {
  const button = formDelete.querySelector('.popup__button');
  setSavingDeleteButton(button);
  deleteCard(idCard)
  .then(result => {
     removeCard(card);      
     closeModal(modalDelete);
    })
   .catch(err => console.log(err))
   .finally(() => {
     setInitialDeleteButton(button);
   });  
};

// @todo: Подтверждаем cмену аватара
function handleAvatarSubmit(avatarUrl) {
  const button = formAvatar.querySelector('.popup__button');
  setSavingState(button);  
  editAvatar(avatarUrl)
   .then(result => {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;
      closeModal(modalAvatar);  
   })
   .catch(err => console.log(err))
   .finally(() => {
      setInitialSaveState(button);
   });  
};


// @todo: Слушателель закрытия модальных окон
modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  })
})


Promise.all([getNameProfile(),getInitialCards()])
 .then(([resultUser, resultCards]) => {
    // обрабатываем результат
    const myId = resultUser._id;
    profileTitle.textContent=resultUser.name;
    profileDescription.textContent=resultUser.about;
    profileImage.style.backgroundImage = `url(${resultUser.avatar})`;

    resultCards.forEach(element => {
     const cardElement = createCard(
      myId,
      element,
      {
        likeCard,
        openModalDelete,
        openModalImage
      }
    );
    cardsList.append(cardElement); 
    });


    // @todo: Прикрепляем обработчик к форме: “submit” - «отправка»
    formEditProfile.addEventListener('submit', handleFormProfileSubmit);
    formNewCard.addEventListener('submit', function (evt) {
      evt.preventDefault();
      handleFormCardSubmit(myId);
    });
  })
  .catch(err => console.log(err));
