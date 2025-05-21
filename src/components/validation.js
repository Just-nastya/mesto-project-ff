const showInputError = (formElement, inputElement, validationConfig, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationConfig.errorClass}`);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.classList.remove(`${validationConfig.errorClass}`);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};


const setEventListeners = (formElement, validationConfig) => {
   const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
   const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
   toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', function () {
       checkInputValidity(formElement, inputElement, validationConfig);
       toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

// @todo: Валидация полей форм
export function enableValidation(validationConfig) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList=Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
   formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, validationConfig);
  });

};

const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => {
      if (!inputElement.validity.valid || inputElement.validity.patternMismatch) {
        return true;
      }
});
};

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(`${inactiveButtonClass}`);
} else {
  buttonElement.classList.remove(`${inactiveButtonClass}`);
}
};


// @todo: Очистка валидации полей форм
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig); 
    checkInputValidity(formElement, inputElement, validationConfig);
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  });
};