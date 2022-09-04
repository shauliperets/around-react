//import logoImage from "../images/logo.svg";
import editButton from "../images/edit-button.svg";
import { api } from "../utils/api";
import React from "react";
import whiteHeartIcon from "../images/heart.svg";
import blackHeartIcon from "../images/heart-black.svg";
import binIcon from "../images/delete-icon.svg";
import { UserInfo } from "../utils/UserInfo";

function Main(props) {
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]); //need to save as card object

  React.useEffect(() => {
    api.getUserInfo().then((result) => {
      setUserId(result._id);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);
    });

    api.getInitialCards().then((result) => {
      console.log("cards =>", result);
      setCards(result);
    });
  }, []);

  React.useEffect(() => {}, [cards]);

  const handleLikeClick = (event) => {
    const cardId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("card_id");

    const card = getCardById(cardId, cards);

    api.addRemoveLike(cardId, isLiked(card, userId)).then((result) => {
      setCardLikes(cards, card, result);
    });
  };

  function setCardLikes(cards, card, result) {
    const array = cards.map((item) => {
      if (item._id == card._id) {
        return result;
      } else {
        return item;
      }
    });

    setCards(array);
  }

  function isLiked(card, userId) {
    let result = false;
    let likesIds = [];

    card.likes.forEach((like) => {
      likesIds.push(like._id);
    });

    if (likesIds.includes(userId)) {
      result = true;
    }

    return result;
  }

  function getCardById(cardId, cards) {
    let result = {};
    cards.forEach((card) => {
      if (card._id == cardId) {
        result = card;
      }
    });

    return result;
  }

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__image-container">
            <img src={userAvatar} alt="Profile image" className="profile__image" />
            <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
          </div>
          <div className="profile__content">
            <div className="profile__title-panel">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
                <img className="profile__edit-image" src={editButton} alt="Edit button" />
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <div className="card" key={card._id} card_id={card._id}>
              <button className="card__delete-button" type="button">
                <img src={binIcon} alt="" />
              </button>
              <img src={card.link} alt={card.name} className="card__image" onClick={props.onCardClick} />
              <div className="card__title-panel">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                  <button
                    className="card__like-button"
                    type="button"
                    onClick={(event) => {
                      handleLikeClick(event);
                    }}
                  >
                    <img
                      src={isLiked(card, userId) ? blackHeartIcon : whiteHeartIcon}
                      className="card__icon"
                      alt="Heart icon"
                    />
                  </button>
                  <div className="card__like-counter">{card.likes.length}</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
