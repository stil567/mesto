const imagePopupTitle = document.querySelector(".popup-img__title");
const photoElementImagePopup = document.querySelector(".popup-img__photo");
const popupImage = document.querySelector(".popup-img");
const buttonCloseImage = document.querySelector(".popup__button-close_image");

export default class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListenersLike();
    this._setEventListenersTrash();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;

    return this._element;
  }

  /*лайк*/
  _setEventListenersLike() {
    this._element
      .querySelector(".element__button-like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__button-like_active");
      });
  }

  /*удаление карточки*/
  _setEventListenersTrash() {
    this._element
      .querySelector(".element__button-trash")
      .addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
      });
  }
  /*открытие картинки*/
  _openedCardImgPopup() {
    imagePopupTitle.textContent = this._name;
    photoElementImagePopup.src = this._link;
    photoElementImagePopup.alt = this._name;

    popupImage.classList.add("popup_opened");
  }

  /*закрытие картинки*/
  _closeCardImgPopup() {
    popupImage.classList.remove("popup_opened");
  }

  _setEventListeners() {
    const cardElementImg = this._element.querySelector(".element__image");
    cardElementImg.addEventListener("click", (evt) => {
      this._openedCardImgPopup();
    });
    buttonCloseImage.addEventListener("click", () => {
      this._closeCardImgPopup();
    });
  }
}

export { popupImage };
