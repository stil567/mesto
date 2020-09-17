import {cards} from './card.js';
import Card from './card.js';
import {popupImage} from './card.js';

const body = document.querySelector('.root');
const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const formAll = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupButton = document.querySelector('.popup__button');
const buttonClose = document.querySelector('.popup__button-close');
const buttonCloseAdd = document.querySelector('.popup__button-close_add');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const formElement = document.querySelector('.popup__container');
const formAdd = document.querySelector('.popup__container_add');
const popupForm = document.querySelector('.popup__form');
const elementContent = document.querySelector('.elements__content');
const form = document.querySelector('#form');

/*функция открытия и закрытия*/
function togglePopup(popup){
    popup.classList.toggle('popup_opened');
}

/*закрытие при клике escape*/
const closeEscPopup = (popup) => (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
    togglePopup(popup);
  }
};
/*закрытие при клике вне области*/ 
function closeOverlayPopup (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened'))
      togglePopup(popup);
  });
};

/*открытие окна редактирования*/
function openEditProfilePopup(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    togglePopup(popupEdit);
    body.addEventListener('keydown', closeEscPopup(popupEdit));
    closeOverlayPopup(popupEdit);
    resetError(popupEdit, validateObject);
}

/*открытие окна добавления картинки*/
function openCreateCardPopup(){
    form.reset();
    togglePopup(popupAdd);
    body.addEventListener('keydown', closeEscPopup(popupAdd));
    closeOverlayPopup(popupAdd);
    resetError(popupAdd, validateObject);
}

/*редактирование профиля*/
function editProfileFormSubmitHandler(evt){
    evt.preventDefault(); 
    profileTitle.textContent = (nameInput.value);
    profileSubtitle.textContent = (jobInput.value);
    togglePopup(popupEdit);
    popupButton.removeEventListener('click', closeOverlayPopup(popupEdit));
    popupButton.removeEventListener('click', closeEscPopup(popupEdit));
}

/*открытие окна редактирования*/
editProfileButton.addEventListener('click', openEditProfilePopup);
/*открытие окна добавления картинки*/
createCardButton.addEventListener('click', openCreateCardPopup);
/*редактирование профиля*/
formElement.addEventListener('submit', editProfileFormSubmitHandler);
/*закрытие окна редактирования*/
buttonClose.addEventListener('click', function(){
    togglePopup(popupEdit);
    popupButton.removeEventListener('click', closeOverlayPopup(popupEdit));
    popupButton.removeEventListener('click', closeEscPopup(popupEdit));
});
/*закрытие окна добавления картинки*/
buttonCloseAdd.addEventListener('click', function(){
    togglePopup(popupAdd);
    popupButton.removeEventListener('click', closeOverlayPopup(popupAdd));
    popupButton.removeEventListener('click', closeEscPopup(popupAdd));
});

/*добавление карточки пользователем*/
formAdd.addEventListener('submit', ()=>{
    const inputAddName = document.querySelector('.popup__input_add-name');
    const inputAddLink = document.querySelector('.popup__input_add-link');

    let temporaryCard = { 
      name:inputAddName.value,
      link:inputAddLink.value
    }

    const card = new Card(temporaryCard, '#element-template');
    const cardElement = card.generateCard();

    document.querySelector('.elements__content').prepend(cardElement);

    togglePopup(popupAdd);
    body.addEventListener('keydown', closeEscPopup(popupImage));
    closeOverlayPopup(popupImage); 

});

/*добавление 6 карточек*/
cards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.querySelector('.elements__content').prepend(cardElement);

    togglePopup(popupImage);
    body.addEventListener('keydown', closeEscPopup(popupImage));
    closeOverlayPopup(popupImage); 
  
});

