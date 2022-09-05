import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";

function App(props) {
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]); //need to save as card object
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [createCardTitle, setCreateCardTitle] = React.useState("");
  const [createCardLink, setCreateCardLink] = React.useState("");
  const [profileName, setProfileName] = React.useState("");
  const [profileAbout, setProfileAbout] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState("");
  const [popupProfileButton, setPopupProfileButton] = React.useState("Save");
  const [popupCreateCardButton, setPopupCreateCardButton] = React.useState("Create");
  const [popupEditAvatarButton, setPopupEditAvatarButton] = React.useState("Save");

  React.useEffect(() => {
    api.getUserInfo().then((result) => {
      setUserId(result._id);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);

      setProfileName(result.name);
      setProfileAbout(result.about);
    });

    api.getInitialCards().then((result) => {
      console.log("cards =>", result);
      setCards(result);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  const handleCardClick = (event) => {
    setIsImagePopupOpen(true);
    setSelectedCard(event.target);
  };

  function handleDeleteCard(event) {
    console.log("card delete ==>>>>", event.target.parentNode.parentNode.getAttribute("card_id"));
    const cardId = event.target.parentNode.parentNode.getAttribute("card_id");
    api.deleteCard(cardId).then((result) => {
      console.log("delete result", result);

      //const array = cards.filter(isEquel);

      const array = cards.filter((card) => {
        return card._id != cardId;
      });

      setCards(array);
    });
  }

  /*function isEquel(card) {
    console.log("card._id =>", card._id, "props.cardId =>", cardId);
    if (card._id == props.cardId) return true;
  }*/

  const handleCreateCardSubmit = (event) => {
    event.preventDefault();
    console.log("create card clicked...");

    setPopupCreateCardButton("Saving...");

    api
      .addCard(createCardTitle, createCardLink)
      .then((result) => {
        cards.unshift(result);
        setCards(cards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setPopupCreateCardButton("Save");
      });
  };

  const handleLikeClick = (event) => {
    const cardId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("card_id");

    const card = getCardById(cardId, props.cards);

    api.addRemoveLike(cardId, isLiked(card, props.userId)).then((result) => {
      setCardLikes(props.cards, card, result);
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

  const handleEditProfileSubmit = (event) => {
    event.preventDefault();
    console.log("edit profile clicked...");
    console.log("profile name =>", profileName);
    console.log("profile about =>", profileAbout);

    setPopupProfileButton("Saving...");

    api
      .setUserInfo(profileName, profileAbout)
      .then((result) => {
        console.log("Profile changed", result);

        setUserName(result.name);
        setUserDescription(result.about);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        //profilePopup.setButtonText("Save");
        setPopupProfileButton("Save");
      });
  };

  const handleEditAvatarSubmit = (event) => {
    event.preventDefault();
    console.log("edit avatar clicked...");
    console.log("profile avatar =>", profileAvatar);

    setPopupEditAvatarButton("Saving...");

    api
      .setProfileImage(profileAvatar)
      .then((result) => {
        console.log("Profile changed", result);
        setUserAvatar(result.avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        //profilePopup.setButtonText("Save");
        setPopupEditAvatarButton("Save");
      });

    /*api.addCard("name", "link").then((result) => {
      console.log(result);
    });*/
  };

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsImagePopupOpen(false);
  }

  function updateTitleCard(event) {
    setCreateCardTitle(event.target.value);
  }

  function updateLinkCard(event) {
    setCreateCardLink(event.target.value);
  }

  function updateProfileName(event) {
    setProfileName(event.target.value);
  }

  function updateProfileAbout(event) {
    setProfileAbout(event.target.value);
  }

  function updateProfileAvatar(event) {
    setProfileAvatar(event.target.value);
  }

  return (
    <>
      <div className="page">
        <Header />

        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          handleDeleteCard={handleDeleteCard}
          userId={userId}
          userName={userName}
          userDescription={userDescription}
          userAvatar={userAvatar}
          cards={cards}
          handleLikeClick={handleLikeClick}
          isLiked={isLiked}
          isEditProfilePopupOpen={false} /** ??? */
          isAddPlacePopupOpen={false} /** ??? */
          isEditAvatarPopupOpen={false} /** ??? */
        />

        <Footer />

        <PopupWithForm
          name="create-card"
          handleSubmit={handleCreateCardSubmit}
          title="New place"
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          button={popupCreateCardButton}
        >
          <input
            id="popup_title"
            type="text"
            className="popup__input"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
            onChange={(event) => updateTitleCard(event)}
          />
          <div id="popup_title_error" className="popup__input-error"></div>
          <input
            id="popup_link"
            className="popup__input"
            placeholder="Image link"
            type="url"
            onChange={(event) => updateLinkCard(event)}
            required
          />
          <div id="popup_link_error" className="popup__input-error"></div>
        </PopupWithForm>

        <PopupWithForm
          name="edit-profile"
          handleSubmit={handleEditProfileSubmit}
          title="Edit profile"
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          button={popupProfileButton}
        >
          <input
            id="popup_name"
            type="text"
            className="popup__input"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
            value={profileName}
            onChange={(event) => updateProfileName(event)}
          />
          <div id="popup_name_error" className="popup__input-error"></div>
          <input
            id="popup_about_me"
            type="text"
            className="popup__input"
            placeholder="About me"
            required
            minLength="2"
            maxLength="200"
            value={profileAbout}
            onChange={(event) => updateProfileAbout(event)}
          />
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          handleSubmit={handleEditAvatarSubmit}
          title="Update profile picture"
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          button={popupEditAvatarButton}
        >
          <input
            id="popup_avatar_link"
            className="popup__input"
            placeholder="Avatar link"
            type="url"
            onChange={(event) => updateProfileAvatar(event)}
            required
          />
          <div id="popup_avatar_link_error" className="popup__input-error"></div>
        </PopupWithForm>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </>
  );
}

export default App;
