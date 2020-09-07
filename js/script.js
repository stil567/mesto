const cards = [
    {
        name: 'Превозмогая',
        link: 'https://cs4.pikabu.ru/post_img/big/2015/05/07/6/1430989171_1871837159.jpg'
    },
    {
        name: 'Велосипеды',
        link: 'https://habrastorage.org/webt/cy/fc/tv/cyfctvyojzgxh3gf7z7g-78m7s8.jpeg'
    },
    {
        name: 'Покаряя',
        link: 'https://pp.userapi.com/c636630/v636630623/5b73c/NgZ_Gn_wJBw.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
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
const formAdd = document.querySelector('.popup__container_add');
const photoElementImagePopup = document.querySelector('.popup-img__photo');
const imagePopupTitle = document.querySelector('.popup-img__title');
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
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
    profileTitle.textContent = (nameInput.value);
    profileSubtitle.textContent = (jobInput.value);
    togglePopup(popupEdit);
    popupButton.removeEventListener('click', closeOverlayPopup(popupEdit));
    popupButton.removeEventListener('click', closeEscPopup(popupEdit));
}

/*добавление карточки на страницу*/
function createCard(name, link){
    const elementTemplate = document.querySelector('#element-template').content;
    const card = elementTemplate.cloneNode(true);
    const cardElementImg = card.querySelector('.element__image');
    
    card.querySelector('.element__title').textContent = name;
    cardElementImg.alt = name;
    cardElementImg.src = link;
    
    /*лайк*/
    card.querySelector('.element__button-like').addEventListener('click', function (evt){
        evt.target.classList.toggle('element__button-like_active');
    });

    /*удаление карточки пользователем*/
    card.querySelector('.element__button-trash').addEventListener('click', function (evt){
        evt.target.closest('.element').remove();
    });
    
    /*открытие картинки на весь экран*/
    cardElementImg.addEventListener('click', function(evt){
        imagePopupTitle.textContent = name;
        photoElementImagePopup.src = link;
        photoElementImagePopup.alt = name;

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
   addCard(createCard(item.name ,item.link));
});

/*добавление карточки пользователем*/
function addCardFormSubmitHandler(evt){
    evt.preventDefault();
    const name = inputAddName.value;
    const link = inputAddLink.value;
    
    addCard(createCard(name,link));
    togglePopup(popupAdd);
    popupButton.removeEventListener('click', closeOverlayPopup(popupAdd));
    popupButton.removeEventListener('click', closeEscPopup(popupAdd));
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
/*закрытие изображения*/
buttonCloseImage.addEventListener('click', function(){
    togglePopup(popupImage);
    popupButton.removeEventListener('click', closeOverlayPopup(popupImage));
    popupButton.removeEventListener('click', closeEscPopup(popupImage));
});
/*добавление карточки пользователем*/
formAdd.addEventListener('submit', addCardFormSubmitHandler);