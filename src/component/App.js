import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
import { FormValidator } from "../utils/FormValidator";
import { settings } from "../utils/settings";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//
function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        console.log("user response =>", response);

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

  const handleCreateCardSubmit = (data) => {
    const title = data[0].props.value;
    const link = data[2].props.value;

    setIsLoading(true);

    api
      .addCard(title, link)
      .then((response) => {
        setCards([response, ...cards]);
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
    currentUser.name = data[0].props.value;
    currentUser.about = data[2].props.value;

    setIsLoading(true);

    api
      .setUserInfo(currentUser.name, currentUser.about)
      .then((response) => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarSubmit = (data) => {
    currentUser.avatar = data[0].ref.current.value;
    setIsLoading(true);

    api
      .setProfileImage(currentUser.avatar)
      .then((response) => {
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

  const handleLikeClick = (card) => {
    api.addRemoveLike(card._id, isLiked(card.likes, currentUser._id)).then((response) => {
      setCardLikes(card, response);
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
      setCards((state) => state.filter((item) => item._id !== cardId));
    });
  };

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
          cards={cards}
          setCardLikes={setCardLikes}
          setCards={setCards}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteCard}
          isLiked={isLiked}
        />

        <Footer />

        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onSubmit={handleCreateCardSubmit}
          button={isLoading ? "Saving..." : "Save"}
        ></AddPlacePopup>

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
          button={isLoading ? "Saving..." : "Save"}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          button={isLoading ? "Saving..." : "Save"}
          onSubmit={handleEditAvatarSubmit}
        ></EditAvatarPopup>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
