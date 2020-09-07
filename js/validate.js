const validateObject = {
  formSelector:'.popup__form',
  inputSelector:'.popup__input',
  submitButtonSelector:'.popup__button',
  inactiveButtonClass:'popup__button_disabled',
  inputErrorClass:'popup__input_type_error',
  errorClass:'popup__error_visible',
  popupError :'.popup__error',
};

    /*добавления классов-ошибок*/
    const showInputError = (formSelector, inputSelector, errorMessage, { inputErrorClass, errorClass }) => {
      const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
      inputSelector.classList.add(inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);  
    };
    /*скрытие классов-ошибок*/
    const hideInputError = (formSelector,inputSelector, { inputErrorClass, errorClass }) => {
      const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
      inputSelector.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    };
    /*проверка поля на валидность*/
    const checkInputValidity = (formSelector, inputSelector, rest) => {
          if (!inputSelector.validity.valid) {
          const errorMessage = inputSelector.validationMessage;
        showInputError(formSelector, inputSelector, errorMessage, rest);
      }   
        else {
        hideInputError(formSelector, inputSelector, rest); 
      } 
    };

 /*валидация всех полей*/
    function hasInvalidInput(inputList){
      return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;    
      });
    }
    /*блокировка popup__button*/
    function toggleButtonState(inputList,buttonElement, inactiveButtonClass){
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } 
        else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }
    /*массив всех input*/
    const setEventListeners = (formSelector,{ inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {       
        const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
        const buttonElement = formSelector.querySelector(submitButtonSelector);
    
        toggleButtonState(inputList, buttonElement, inactiveButtonClass); 
            
        inputList.forEach((inputSelector) => {
            inputSelector.addEventListener('input', function () {
                checkInputValidity(formSelector,inputSelector, rest);
                toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        });
    };

     /*очищение при открытии форм*/
    function resetError(formSelector, {inputSelector,submitButtonSelector, inactiveButtonClass,inputErrorClass, errorClass, ...rest}) {
        const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
        const buttonElement = formSelector.querySelector(submitButtonSelector);
        inputList.forEach((inputSelector) => {
            hideInputError(formSelector, inputSelector,{ inputErrorClass, errorClass });
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    }
 
    function enableValidation({formSelector, ...rest}) {
        const formList = Array.from(document.querySelectorAll(formSelector));
        formList.forEach((formSelector) => {
            formSelector.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setEventListeners(formSelector, rest);
        });
    }
enableValidation(validateObject);