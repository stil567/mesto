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

const aditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
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
const InputAddName = document.querySelector('.popup__input_add-name');
const InputAddLink = document.querySelector('.popup__input_add-link');
const formElement = document.querySelector('.popup__container');
const formCard = document.querySelector('.popup__container-add');
const formAdd = document.querySelector('.popup__container_add');
const popupPhoto = document.querySelector('.popup-img__photo');
const popupTitle = document.querySelector('.popup-img__title');
const popupForm = document.querySelector('.popup__form');
const popupInput = document.querySelector('.popup__input');
const Body = document.querySelector('.root');

/*функция открытия и закрытия*/
function popupOpenClose(OpClose){
    OpClose.classList.toggle('popup_opened');
}

/*функция открытия и закрытия при клике вне области и escape*/
formAll.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')){
      popupOpenClose(popup)}
  });
   Body.addEventListener('keydown', function (evt){
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
    popupOpenClose(popup);
  }
   });  
});

/*открытие окна редактирования*/
function aditOpened(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    popupOpenClose(popupEdit);
}
aditButton.addEventListener('click', aditOpened);

/*открытие окна добавления картинку*/
function AddOpened(){
    popupOpenClose(popupAdd);
}
addButton.addEventListener('click', AddOpened);

/*редактирование профиля*/
function formSubmitHandler(evt){
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

     profileTitle.textContent = (nameInput.value);
     profileSubtitle.textContent = (jobInput.value);

     popupOpenClose(popupEdit);
}
formElement.addEventListener('submit', formSubmitHandler);

/*добавление 6 карточек на страницу*/
cards.forEach(function (item){
    addCard(item.name ,item.link, item.id);
});

/*добавление карточки на страницу*/
function addCard(name, link, id){
    const elementTemplate = document.querySelector('#element-template').content;
    const elementContent = document.querySelector('.elements__content');
    const userElement = elementTemplate.cloneNode(true);
    
    userElement.querySelector('.element__title').textContent = (name);
    userElement.querySelector('.element__image').src = (link);
    userElement.querySelector('.element').id=(id);

    /*лайк*/
    userElement.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
    });

    /*удаление карточки пользователем*/
    userElement.querySelector('.element__button-trash').addEventListener('click', function (evt){
    evt.target.closest('.element').remove();
    });
    
    /*открытие картинки на весь экран*/
    userElement.querySelector('.element__image').addEventListener('click', function(evt){
    const cardElementId = evt.target.parentElement.id;
    //const idWithoutPrefix = cardElementId;
    const idAsNumber = Number(cardElementId);
    const cardInfo = cards.find(item => item.id === idAsNumber);

    popupTitle.textContent =  cardInfo.name;
    popupPhoto.src = cardInfo.link;

    popupOpenClose(popupImage);
        
    });
     
    elementContent.prepend(userElement);
}

/*добавление карточки пользователем*/
function formSubmitAdd(evt){
    evt.preventDefault();

    const name = InputAddName.value;
    const link = InputAddLink.value;
    const id = cards.length + 1;
    
    cards.push({id: id, name: name, link: link})

    addCard(name,link,id);
    popupOpenClose(popupAdd);
}
formAdd.addEventListener('submit', formSubmitAdd);

/*закрытие окна редактирования*/
buttonClose.addEventListener('click', function(){
    popupOpenClose(popupEdit);
});
/*закрытие окна добавления картинки*/
buttonCloseAdd.addEventListener('click', function(){
    popupOpenClose(popupAdd);
});
/*закрытие изображения*/
buttonCloseImage.addEventListener('click', function(){
    popupOpenClose(popupImage);
});