import editButton from "../images/edit-button.svg";
import React from "react";
import whiteHeartIcon from "../images/heart.svg";
import blackHeartIcon from "../images/heart-black.svg";
import binIcon from "../images/delete-icon.svg";

function Main(props) {
  React.useEffect(() => {}, [props.cards]);

  function isOwned(ownerId) {
    if (props.userId == ownerId) {
      return true;
    }

    return false;
  }

  return (
    <>
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
            <div className="card" key={card._id} card_id={card._id}>
              <button
                className={
                  isOwned(card.owner._id) ? "card__delete-button card__delete-button_active" : "card__delete-button"
                }
                type="button"
                onClick={props.handleDeleteCard}
              >
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
                      props.handleLikeClick(event);
                    }}
                  >
                    <img
                      src={props.isLiked(card, props.userId) ? blackHeartIcon : whiteHeartIcon}
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
