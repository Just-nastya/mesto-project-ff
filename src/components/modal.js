//@todo: Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandlerEscape);
}

//@todo: Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandlerEscape); 
}

export function keyHandlerEscape(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened'); 
    closeModal(openedModal);
  }
}