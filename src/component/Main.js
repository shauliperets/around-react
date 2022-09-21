import editButton from "../images/edit-button.svg";
import React from "react";
import Card from "./Card";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleLikeClick = (card) => {
    api.addRemoveLike(card._id, isLiked(card.likes, currentUser._id)).then((response) => {
      props.setCardLikes(card, response);
    });
  };

  function isLiked(likes, userId) {
    let result = false;
    let likesIds = [];

    likes.forEach((like) => {
      likesIds.push(like._id);
    });

    if (likesIds.includes(userId)) {
      result = true;
    }

    return result;
  }

  const handleDeleteCard = (cardId) => {
    api.deleteCard(cardId).then(() => {
      props.setCards((state) => state.filter((item) => item._id !== cardId));
    });
  };

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img src={currentUser.avatar} alt="Profile image" className="profile__image" />
          <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
        </div>
        <div className="profile__content">
          <div className="profile__title-panel">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
              <img className="profile__edit-image" src={editButton} alt="Edit button" />
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            data={card}
            id={card._id}
            ownerId={card.owner._id}
            title={card.name}
            link={card.link}
            likes={card.likes}
            userId={props.userId}
            onDeleteCard={handleDeleteCard}
            onCardClick={props.onCardClick}
            onLikeClick={handleLikeClick}
            isLiked={isLiked}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
