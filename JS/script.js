let aditButton = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupButton = document.querySelector('.popup__button');

let formElement = document.querySelector('.popup__container');


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


/*редактирование профиля*/

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
 
     profileTitle.textContent = (nameInput.value);
     profileSubtitle.textContent = (jobInput.value);
    
     editClose();
}

formElement.addEventListener('submit', formSubmitHandler);







