import editButton from "../images/edit-button.svg";
import React from "react";
import Card from "./Card";

function Main(props) {
  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img src={props.userAvatar} alt="Profile image" className="profile__image" />
          <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
        </div>
        <div className="profile__content">
          <div className="profile__title-panel">
            <h1 className="profile__title">{props.userName}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
              <img className="profile__edit-image" src={editButton} alt="Edit button" />
            </button>
          </div>
          <p className="profile__subtitle">{props.userDescription}</p>
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
            handleDeleteCard={props.handleDeleteCard}
            onCardClick={props.onCardClick}
            handleLikeClick={props.handleLikeClick}
            isLiked={props.isLiked}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
