const validateObject = {
  formSelector:'.popup',
  inputSelector:'.popup__input',
  inactiveButtonClass:'popup__button_disabled',
  inputErrorClass:'popup__input_type_error',
  errorClass:'popup__error_visible',
};

function enableValidation({formSelector,inputSelector,buttonElement, inactiveButtonClass, inputErrorClass,errorClass}) {
  
    /*добавления классов-ошибок*/
    const showInputError = (formSelector, inputSelector, errorMessage) => {
      const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
      inputSelector.classList.add(inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
    };
    /*скрытие классов-ошибок*/
    const hideInputError = (formSelector, inputSelector) => {
      const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
      inputSelector.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    };
    /*проверка поля на валидность*/
    const checkInputValidity = (formSelector, inputSelector) => {
      if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);
      } else {
        hideInputError(formSelector, inputSelector);
      }
    };
    /*массив всех input*/
    const setEventListeners = (formSelector) => {
      const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
        const buttonElement = formSelector.querySelector('.popup__button');
           toggleButtonState(inputList, buttonElement);   
        inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', function () {
          checkInputValidity(formSelector, inputSelector);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
    /*массив всех form*/
    function enableValidationForm(){
      const formList = Array.from(document.querySelectorAll('.popup__form'));

        formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formSelector);

        const fieldsetList = Array.from(formSelector.querySelectorAll('.popup__fields'));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
    }
    enableValidationForm();

    /*валидация всех полей*/
    function hasInvalidInput(inputList){
      return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;    
    });
    }
    /*блокировка popup__button*/
    function toggleButtonState(inputList,buttonElement){
      if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
        }
    }
}

enableValidation(validateObject);