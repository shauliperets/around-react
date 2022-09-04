//import logoImage from "../images/logo.svg";
import editButton from "../images/edit-button.svg";
import { api } from "../utils/api";
import React from "react";
import whiteHeartIcon from "../images/heart.svg";
import blackHeartIcon from "../images/heart-black.svg";
import binIcon from "../images/delete-icon.svg";
import { UserInfo } from "../utils/UserInfo";

function Main(props) {
  //const [userInfo, setUserInfo] = React.useState({});

  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]); //need to save as card object
  //const [selectedCard, setSelectedCard] = React.useState([]);

  //let userId = "";

  React.useEffect(() => {
    api.getUserInfo().then((result) => {
      //console.log("user details =>", result);
      //userInfo = new UserInfo(result._id, result.name, result.about, result.avatar);
      //setUserInfo(new UserInfo(result._id, result.name, result.about, result.avatar));
      //userId = result._id;
      setUserId(result._id);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);

      //console.log("userInfo 1=>", userId);
    });

    api.getInitialCards().then((result) => {
      //console.log("cards =>", result);
      setCards(result);
    });
  }, []);

  React.useEffect(() => {}, [cards]);

  const handleLikeClick = (event) => {
    //console.log("userInfo 2=>", userId);

    //console.log("like click path =>", event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("card_id"));

    const cardId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("card_id");

    //console.log("cardId =>", cardId);
    //console.log("cards =>", cards);

    const card = getCardById(cardId, cards);

    //console.log("card =>", card);

    api.addRemoveLike(cardId, isLiked(card, userId)).then((result) => {
      console.log("api result 33 =>", result);
      setCardLikes(cards, card, result);
      //setUserName(result.name);
      //setUserDescription(result.about);
      //setUserAvatar(result.avatar);
    });

    /*api.addRemoveLike().then((result) => {
      //console.log("api result =>", result);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);
    });*/
  };

  function setCardLikes(cards, card, result) {
    console.log("card 0=>", card);
    console.log("result 0=>", result);
    console.log("cards 1=>", cards);

    const array = cards.map((item) => {
      if (item._id == card._id) {
        console.log("true ===>");
        return result;

        /*if (isLiked(card, userId)) {
          //addLike()
          //item.likes.push(likes);
        }*/
      } else {
        return item;
      }
    });

    setCards(array);

    console.log("cards 2=>", array);
  }

  function isLiked(card, userId) {
    let result = false;
    let likesIds = [];

    card.likes.forEach((like) => {
      likesIds.push(like._id);
    });

    //console.log(card.name, likesIds);

    if (likesIds.includes(userId)) {
      //this._likeIcon.src = blackHeartIcon;

      result = true;
    }

    //console.log("user id:", userId, card.name, likesIds, result);

    return result;
  }

  function getCardById(cardId, cards) {
    let result = {};
    cards.forEach((card) => {
      //console.log("card id =>", card._id);
      if (card._id == cardId) {
        //console.log("true --->");
        result = card;
        //console.log("result =>", result);
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
