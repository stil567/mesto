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

let aditButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let buttonClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup-add');
let buttonCloseAdd = document.querySelector('.popup__button-close_add');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__container');
let formCard = document.querySelector('.popup__container-add');
let InputAddName = document.querySelector('.popup__input_add-name');
let InputAddLink = document.querySelector('.popup__input_add-link');
let formAdd = document.querySelector('.popup__container_add');
let popupImage = document.querySelector('.popup-img');
let popupPhoto = document.querySelector('.popup-img__photo');
let popupTitle = document.querySelector('.popup-img__title');
let buttonCloseImage = document.querySelector('.popup__button-close_image');

const cardIdPrefix = "post-"

/*отобразить картинку на весь экран*/
function increase(evt){
    const cardElementId = evt.target.parentElement.id;
    const idWithoutPrefix = cardElementId.slice(cardIdPrefix.length, cardElementId.length);
    const idAsNumber = Number(idWithoutPrefix);
    const cardInfo = cards.find(item => item.id === idAsNumber);

    popupTitle.textContent =  cardInfo.name;
    popupPhoto.src = cardInfo.link;

    popupImage.classList.add('popup_opened');
}

/*открытие окна редактирования*/
function aditOpened(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    popup.classList.add('popup_opened');
}

aditButton.addEventListener('click', aditOpened);

/*закрытие окна редактирования*/
function editClose(){
    popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', editClose);

/*открытие окна добавления*/
function AddOpened(){
    popupAdd.classList.add('popup_opened');
}
addButton.addEventListener('click', AddOpened);

/*закрытие окна добавления*/
function addClose(){
    popupAdd.classList.remove('popup_opened');
}
buttonCloseAdd.addEventListener('click', addClose);

/*редактирование профиля*/
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

     profileTitle.textContent = (nameInput.value);
     profileSubtitle.textContent = (jobInput.value);

     editClose();
}
formElement.addEventListener('submit', formSubmitHandler);

/*количество карточек на странице*/
let counter = 0;

/*добавление 6 карточек на страницу*/
for (i=0; i < cards.length; i++){
    counter++;
   addCard(cards[i].name ,cards[i].link);
}
/*добавление карточки на страницу*/
function addCard(name, link) {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementContent = document.querySelector('.elements__content');
    const userElement = elementTemplate.cloneNode(true);

    userElement.querySelector('.element__title').textContent = (name);
    userElement.querySelector('.element__image').src = (link);
    userElement.querySelector('.element').id=(cardIdPrefix + counter);

    /*лайк*/
    userElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
    });

    /*удаление карточки пользователем*/
    userElement.querySelector('.element__button-trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
    });
    userElement.querySelector('.element__image').addEventListener('click', increase);

    elementContent.prepend(userElement);
}

/*добавление карточки пользователем*/
function formSubmitAdd(evt){
    evt.preventDefault();

    const name = InputAddName.value;
    const link = InputAddLink.value;
    counter++;

    cards.push({id: counter, name: name, link: link})

    addCard(name,link);
    addClose();
}
formAdd.addEventListener('submit', formSubmitAdd);

/*закрытие изображения*/
function imageClose(){
    popupImage.classList.remove('popup_opened');
}
buttonCloseImage.addEventListener('click', imageClose);