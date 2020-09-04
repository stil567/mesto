const cards = [
    {
        id: 1,
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        id: 2,
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        id: 3,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        id: 4,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        id: 5,
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        id: 6,
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const body = document.querySelector('.root');
const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const formAll = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-img');
const popupButton = document.querySelector('.popup__button');
const buttonClose = document.querySelector('.popup__button-close');
const buttonCloseAdd = document.querySelector('.popup__button-close_add');
const buttonCloseImage = document.querySelector('.popup__button-close_image');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const inputAddName = document.querySelector('.popup__input_add-name');
const inputAddLink = document.querySelector('.popup__input_add-link');
const formElement = document.querySelector('.popup__container');
const formCard = document.querySelector('.popup__container-add');
const formAdd = document.querySelector('.popup__container_add');
const popupPhoto = document.querySelector('.popup-img__photo');
const popupTitle = document.querySelector('.popup-img__title');
const popupForm = document.querySelector('.popup__form');
const popupInput = document.querySelector('.popup__input');
const popupSpan = document.querySelector('.popup__error');
const elementContent = document.querySelector('.elements__content');

/*функция открытия и закрытия*/
function togglePopup(opClose){
    opClose.classList.toggle('popup_opened');
}

/*закрытие при клике escape*/
const closeEscPopup = (opClose) => (evt) => {
  if (evt.key === "Escape" && opClose.classList.contains('popup_opened')) {
    togglePopup(opClose);
    resetError(popupEdit);
    resetError(popupAdd);
  }
};
/*закрытие при клике вне области*/ 
function closeOverlayPopup (opClose) {
  opClose.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened'))
      togglePopup(opClose);
      resetError(popupEdit);
      resetError(popupAdd);
  });
};

/*открытие окна редактирования*/
function openEditProfilePopup(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    togglePopup(popupEdit);
    disableButton(popupEdit);
    body.addEventListener('keydown', closeEscPopup(popupEdit));
    closeOverlayPopup(popupEdit);
}
editProfileButton.addEventListener('click', openEditProfilePopup);

/*открытие окна добавления картинку*/
function opencreateCardPopup(){
    inputAddName.value = "";
    inputAddLink.value = "";
    
    togglePopup(popupAdd);
    body.addEventListener('keydown', closeEscPopup(popupAdd));
    closeOverlayPopup(popupAdd);
}
createCardButton.addEventListener('click', opencreateCardPopup);

/*редактирование профиля*/
function formSubmitHandler(evt){
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

     profileTitle.textContent = (nameInput.value);
     profileSubtitle.textContent = (jobInput.value);

     togglePopup(popupEdit);
}
formElement.addEventListener('submit', formSubmitHandler);


/*добавление карточки на страницу*/
function createCard(name, link, id){
    const elementTemplate = document.querySelector('#element-template').content;
    
    const card = elementTemplate.cloneNode(true);
    
    card.querySelector('.element__title').textContent = (name);
    card.querySelector('.element__image').alt = (name);
    card.querySelector('.element__image').src = (link);
    card.querySelector('.element').id=(id);

    /*лайк*/
    card.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
    });

    /*удаление карточки пользователем*/
    card.querySelector('.element__button-trash').addEventListener('click', function (evt){
    evt.target.closest('.element').remove();
    });
    
    /*открытие картинки на весь экран*/
    card.querySelector('.element__image').addEventListener('click', function(evt){
    const cardElementId = evt.target.parentElement.id;
    const idAsNumber = Number(cardElementId);
    const cardInfo = cards.find(item => item.id === idAsNumber);

    popupTitle.textContent =  cardInfo.name;
    popupPhoto.src = cardInfo.link;

    togglePopup(popupImage);
    body.addEventListener('keydown', closeEscPopup(popupImage));
    closeOverlayPopup(popupImage);   
        
    });
    
   return card;
}   
 /*размещение карточки*/   
 function addCard(card){
     elementContent.prepend(card);
 }   
    
/*добавление 6 карточек на страницу*/
cards.forEach(function (item){
   addCard(createCard(item.name ,item.link, item.id));
});

/*добавление карточки пользователем*/
function editProfileFormSubmitHandler(evt){
    evt.preventDefault();

    const name = inputAddName.value;
    const link = inputAddLink.value;
    const id = cards.length + 1;
    
    cards.push({id: id, name: name, link: link})

    addCard(createCard(name,link,id));
    togglePopup(popupAdd);
}
formAdd.addEventListener('submit', editProfileFormSubmitHandler);

/*закрытие окна редактирования*/
buttonClose.addEventListener('click', function(){
    togglePopup(popupEdit);
    resetError(popupEdit);
    
});
/*закрытие окна добавления картинки*/
buttonCloseAdd.addEventListener('click', function(){
    togglePopup(popupAdd);
    resetError(popupAdd);
});
/*закрытие изображения*/
buttonCloseImage.addEventListener('click', function(){
    togglePopup(popupImage);
});

function disableButton(form) {
  const popupButton = form.querySelector('.popup__button');
  popupButton.classList.remove('popup__button_disabled');
}

function resetError(opClose){
    const spanList = Array.from(document.querySelectorAll('.popup__error'));
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    
    if (opClose.classList.contains('popup_opened')){
    }    
    
    else{
         spanList.forEach((popupSpan) => {
            popupSpan.classList.remove('popup__error_visible');
        });
    
        inputList.forEach((popupInput) => {
            popupInput.classList.remove('popup__input_type_error');
        });
    }
}
