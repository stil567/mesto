export default class FormValidator {
  constructor(validateObject, form) {
    this._form = form;
    this._inputSelector = validateObject.inputSelector;
    this._submitButtonSelector = validateObject.submitButtonSelector;
    this._inactiveButtonClass = validateObject.inactiveButtonClass;
    this._inputErrorClass = validateObject.inputErrorClass;
    this._errorClass = validateObject.errorClass;
    this._formButton = validateObject.formButton;
  }
  /*добавления классов-ошибок*/
  _showInputError(input, error, errorMessage) {
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }
  /*скрытие классов-ошибок*/
  _hideInputError(input, error) {
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }
  /*проверка поля на валидность*/
  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        errorElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }
  /*валидация всех полей*/
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }
  /*блокировка popup__button*/
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }
  /*очищение при открытии форм*/
  _resetError(inputList) {
    inputList.forEach((input) => {
      const inputErrorElem = this._form.querySelector(`#${input.id}-error`);
      this._hideInputError(input, inputErrorElem);
    });
  }
  /*массив всех input*/
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const formButton = document.querySelectorAll(this._formButton);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    formButton.forEach((button) => {
      button.addEventListener("click", () => {
        this._resetError(inputList);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
