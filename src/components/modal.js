// модальные окна
const modals = document.querySelectorAll('.popup');

//@todo: Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandlerEscape);
}

//@todo: Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) { // так мы проверим, что юзер кликнул на кнопку или оверлей
      closeModal(modal); // и если это так, закрываем окно, на которое вешаем слушатель (он же на нем сработал)
    }
  })
})

function keyHandlerEscape(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened'); 
      closeModal(openedModal);
  }
}