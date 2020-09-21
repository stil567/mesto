import { popupImage } from "./Card.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cards = [
  {
    name: "Превозмогая",
    link:
      "https://cs4.pikabu.ru/post_img/big/2015/05/07/6/1430989171_1871837159.jpg",
  },
  {
    name: "Велосипеды",
    link:
      "https://habrastorage.org/webt/cy/fc/tv/cyfctvyojzgxh3gf7z7g-78m7s8.jpeg",
  },
  {
    name: "Покоряя",
    link: "https://pp.userapi.com/c636630/v636630623/5b73c/NgZ_Gn_wJBw.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const body = document.querySelector(".root");
const editProfileButton = document.querySelector(".profile__edit-button");
const createCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const buttonClose = document.querySelector(".popup__button-close");
const buttonCloseAdd = document.querySelector(".popup__button-close_add");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const formElement = document.querySelector(".popup__container");
const formAdd = document.querySelector(".popup__container_add");
const elementContent = document.querySelector(".elements__content");
const form = document.querySelector("#form");

const validateObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupError: ".popup__error",
  formButton: ".profile__button",
};

/*закрытие при клике escape*/
const closeEscPopup = (popup) => (evt) => {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_opened");
  }
};

/*закрытие при клике вне области*/
const closeOverlayPopup = (popup) => (evt) => {
  if (evt.target === evt.currentTarget) {
    popup.classList.remove("popup_opened");
  }
};

function getOpenedPopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    body.addEventListener("keydown", closeEscPopup(popup));
    popup.addEventListener("click", closeOverlayPopup(popup));
  } else {
    body.removeEventListener("keydown", closeEscPopup(popup));
    popup.removeEventListener("click", closeOverlayPopup(popup));
  }
}

/*функция открытия и закрытия*/
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");

  getOpenedPopup(popup);
}

/*открытие окна редактирования*/
function openEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  togglePopup(popupEdit);
}

/*открытие окна добавления картинки*/
function openCreateCardPopup() {
  form.reset();
  togglePopup(popupAdd);
}

/*редактирование профиля*/
function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopup(popupEdit);
}

/*открытие окна редактирования*/
editProfileButton.addEventListener("click", openEditProfilePopup);
/*открытие окна добавления картинки*/
createCardButton.addEventListener("click", openCreateCardPopup);
/*редактирование профиля*/
formElement.addEventListener("submit", editProfileFormSubmitHandler);
/*закрытие окна редактирования*/
buttonClose.addEventListener("click", function () {
  togglePopup(popupEdit);
});
/*закрытие окна добавления картинки*/
buttonCloseAdd.addEventListener("click", function () {
  togglePopup(popupAdd);
});

/*создание нового класса Card*/
function createNewCard(item, elementTemplate) {
  const card = new Card(item, elementTemplate);
  const cardElement = card.generateCard();
  elementContent.prepend(cardElement);
}

/*добавление карточки пользователем*/
formAdd.addEventListener("submit", () => {
  const inputAddName = document.querySelector(".popup__input_add-name");
  const inputAddLink = document.querySelector(".popup__input_add-link");
  createNewCard(
    {
      name: inputAddName.value,
      link: inputAddLink.value,
    },
    "#element-template"
  );

  togglePopup(popupAdd);
});

/*добавление 6 карточек*/
cards.forEach((item) => {
  createNewCard(item, "#element-template");

  togglePopup(popupImage);
});

/*валидация форм*/
const editPopupForm = popupEdit.querySelector(validateObject.formSelector);
const editFormValidator = new FormValidator(validateObject, editPopupForm);
editFormValidator.enableValidation();

const addPopupForm = popupAdd.querySelector(validateObject.formSelector);
const addFormValidator = new FormValidator(validateObject, addPopupForm);
addFormValidator.enableValidation();
