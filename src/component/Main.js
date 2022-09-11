import editButton from "../images/edit-button.svg";
import React from "react";
import Cards from "./Cards";
//import whiteHeartIcon from "../images/heart.svg";
//import blackHeartIcon from "../images/heart-black.svg";
//import binIcon from "../images/delete-icon.svg";

function Main(props) {
  //React.useEffect(() => {}, [props.cards]);

  /*function isOwned(ownerId) {
    if (props.userId == ownerId) {
      return true;
    }

    return false;
  }*/

  /*function isOwned(ownerId) {
    return props.userId === ownerId;
  }*/

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
          <Cards
            data={props.cards}
            userId={props.userId}
            onClick={props.handleDeleteCard}
            onCardClick={props.onCardClick}
            handleLikeClick={props.handleLikeClick}
            isLiked={props.isLiked}
          />
        </section>
      </main>
    </>
  );
}

export default Main;
