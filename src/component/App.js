import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
import { FormValidator } from "../utils/FormValidator";
import { settings } from "../utils/settings";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //const [userId, setUserId] = React.useState("");
  //const [userName, setUserName] = React.useState("");
  //const [userDescription, setUserDescription] = React.useState("");
  //const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [createCardTitle, setCreateCardTitle] = React.useState("");
  const [createCardLink, setCreateCardLink] = React.useState("");
  //const [profileName, setProfileName] = React.useState("");
  //const [profileAbout, setProfileAbout] = React.useState("");
  const [profileAvatar, setProfileAvatar] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo() //<---- need to delete it
      .then((response) => {
        console.log("user response =>", response);
        //setUserId(response._id);
        //setUserName(response.name);
        //setUserDescription(response.about);
        //setUserAvatar(response.avatar);

        //setProfileName(response.name);
        //setProfileAbout(response.about);

        setCurrentUser(response);

        enableValidation();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });

    api
      .getInitialCards()
      .then((response) => {
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

  /*const handleDeleteCard = (cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((item) => item._id !== cardId));
    });
  };*/

  const handleCreateCardSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    api
      .addCard(createCardTitle, createCardLink)
      .then((response) => {
        const updateCards = addCardToCards(cards, response);
        setCards(updateCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function addCardToCards(cards, card) {
    cards.unshift(card);
    return cards;
  }

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

  const handleEditProfileSubmit = (data) => {
    //console.log("data=>", data[0].props.value);
    //event.preventDefault();
    currentUser.name = data[0].props.value;
    currentUser.about = data[2].props.value;

    setIsLoading(true);

    api
      .setUserInfo(currentUser.name /*data[0].props.value*/, currentUser.about /*data[2].props.value*/) //  pass data from inputs
      .then((response) => {
        //setUserName(response.name);
        //setUserDescription(response.about);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    api
      .setProfileImage(profileAvatar)
      .then((response) => {
        //setUserAvatar(response.avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
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

  /*
  function updateProfileName(event) {
    //setProfileName(event.target.value);
    console.log("event=>", event.target.value);

    currentUser.name = event.target.value;
    console.log("currentUser=>", currentUser);
    setCurrentUser(currentUser);
  }

  function updateProfileAbout(event) {
    //setProfileAbout(event.target.value);
    currentUser.about = event.target.value;
  }*/

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

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          //handleDeleteCard={handleDeleteCard}
          //userId={userId}
          cards={cards}
          setCardLikes={setCardLikes}
          setCards={setCards}
          //userName={userName}
          //userDescription={userDescription}
          //userAvatar={userAvatar}

          //handleLikeClick={handleLikeClick}
          //isLiked={isLiked}
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

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
          button={isLoading ? "Saving..." : "Save"}
          handleSubmit={handleEditProfileSubmit}
          //currentUser={currentUser}
          //setCurrentUser={setCurrentUser}

          //updateProfileName={updateProfileName}
          //updateProfileAbout={updateProfileAbout}
        ></EditProfilePopup>

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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
