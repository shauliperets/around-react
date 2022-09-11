import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
import { FormValidator } from "../utils/FormValidator";
import { settings } from "../utils/settings";

function App() {
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
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

  const [isLoading, setIsLoading] = React.useState(false);

  //const [popupProfileButton, setPopupProfileButton] = React.useState("Save");
  //const [popupCreateCardButton, setPopupCreateCardButton] = React.useState("Create");
  //const [popupEditAvatarButton, setPopupEditAvatarButton] = React.useState("Save");

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        setUserId(response._id);
        setUserName(response.name);
        setUserDescription(response.about);
        setUserAvatar(response.avatar);

        setProfileName(response.name);
        setProfileAbout(response.about);
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });

    api
      .getInitialCards()
      .then((response) => {
        //console.log("cards =>", response);
        setCards(response);
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
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
    const cardId = event.target.parentNode.parentNode.getAttribute("card_id");
    api.deleteCard(cardId).then(() => {
      //console.log("delete result", result);

      /*const updateCards = cards.filter((card) => {
        return card._id !== cardId;
      });

      setCards(updateCards);*/
      setCards((state) => state.filter((card) => card._id !== cardId));
    });
  }

  const handleCreateCardSubmit = (event) => {
    event.preventDefault();

    //setPopupCreateCardButton("Saving...");
    setIsLoading(true);

    api
      .addCard(createCardTitle, createCardLink)
      .then((response) => {
        cards.unshift(response);
        setCards(cards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        //setPopupCreateCardButton("Save");
        setIsLoading(false);
      });
  };

  const handleLikeClick = (card) => {
    //const cardId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("card_id");

    //const card = getCardById(cardId);

    api.addRemoveLike(card._id, isLiked(card, userId)).then((response) => {
      setCardLikes(card, response);
    });
  };

  function setCardLikes(card, response) {
    const array = cards.map((item) => {
      if (item._id == card._id) {
        return response;
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

  function getCardById(cardId) {
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

    //setPopupProfileButton("Saving...");
    setIsLoading(true);

    api
      .setUserInfo(profileName, profileAbout)
      .then((response) => {
        //console.log("Profile changed", response);

        setUserName(response.name);
        setUserDescription(response.about);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        //setPopupProfileButton("Save");
        setIsLoading(false);
      });
  };

  const handleEditAvatarSubmit = (event) => {
    event.preventDefault();
    //console.log("edit avatar clicked...");
    //console.log("profile avatar =>", profileAvatar);

    //setPopupEditAvatarButton("Saving...");
    setIsLoading(true);

    api
      .setProfileImage(profileAvatar)
      .then((response) => {
        console.log("Profile changed", response);
        setUserAvatar(response.avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        //setPopupEditAvatarButton("Save");
        setIsLoading(false);
      });
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

  const formValidators = {};

  function enableValidation() {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach(function (form) {
      const validator = new FormValidator(settings, form);

      const formName = form.getAttribute("name");

      formValidators[formName] = validator;

      validator.enableValidation();
    });
  }

  enableValidation();

  return (
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
      />

      <Footer />

      <PopupWithForm
        name="create-card"
        handleSubmit={handleCreateCardSubmit}
        title="New place"
        isOpen={isAddPlaceOpen}
        onClose={closeAllPopups}
        button={isLoading ? "Saving..." : "Save"}
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
        button={isLoading ? "Saving..." : "Save"}
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
        <div id="popup_about_me_error" className="popup__input-error"></div>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        handleSubmit={handleEditAvatarSubmit}
        title="Update profile picture"
        isOpen={isEditAvatarOpen}
        onClose={closeAllPopups}
        button={isLoading ? "Saving..." : "Save"}
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
  );
}

export default App;
