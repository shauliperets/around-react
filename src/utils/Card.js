import { heartIcon, blackHeartIcon } from "../utils/constanst.js";

export class Card {
  constructor(userId, data, selector, handleCardClick, handleDeleteClick, handleLike) {
    this._cardId = data._id;
    this._text = data.name;
    this._image = data.link;

    this._template = document.querySelector(selector);

    this._element = this._getTemplate();
    this._element.setAttribute("id", data._id);

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardBin = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._text;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Photo of ${this._text}`;

    this._likeIcon = this._element.querySelector(".card__icon");
    this._likeCounter = this._element.querySelector(".card__like-counter");

    this._likes = data.likes;
    this._likesIds = [];

    this._owner = data.owner;

    if (userId == this._owner._id) {
      this._cardBin.classList.add("card__delete-button_active");
    }

    data.likes.forEach((element) => {
      this._likesIds.push(element["_id"]);
    });

    this._likeIcon.src = heartIcon;

    this._isLiked = false;

    if (this._likesIds.includes(userId)) {
      this._likeIcon.src = blackHeartIcon;

      this._isLiked = true;
    }

    this._likeCounter.textContent = this._likes.length;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
  }

  getId() {
    return this._cardId;
  }

  isLike() {
    return this._isLiked;
  }

  setIcon(icon) {
    this._likeIcon.src = icon;
  }

  setLike(isLike, likeCounter) {
    this._isLiked = isLike;
    this._likeCounter.textContent = likeCounter;
  }

  setCard() {
    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = this._template.content;

    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._setLikeIconClick();

    this._setDeleteClick();

    this._setImageClick();
  }

  _setLikeIconClick() {
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLike(this);
    });
  }

  _setDeleteClick() {
    this._cardBin.addEventListener("click", (event) => {
      this._handleDeleteClick(event);
    });
  }

  _setImageClick() {
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
