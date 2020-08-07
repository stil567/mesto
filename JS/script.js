let aditButton = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupButton = document.querySelector('.popup__button');

/*открытие окна редактирования*/
function aditOpened(){
    
    popup.classList.add('popup_opened');
    
}

aditButton.addEventListener('click', aditOpened);


/*закрытие окна редактирования*/
function editClose(){
    
    popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', editClose);


/*редактирование профиля*/

let formElement = document.querySelector('.popup__container');


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
     
     let name = nameInput.value;
     let job = jobInput.value;
     
     profileTitle.textContent = (name);
     profileSubtitle.textContent = (job);
}

formElement.addEventListener('submit', formSubmitHandler);


function closePup() {
    
    popup.classList.remove('popup_opened');
}

popupButton.addEventListener('click', closePup);






