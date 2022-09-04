import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
//import "./App.css";

function App(props) {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  const handleLikeClick = () => {
    /*React.useEffect(() => {
      api.addRemoveLike().then((result) => {
        //console.log("cards =>", result);
        //setCards(result);
      });
    });*/
  };

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsImagePopupOpen(false);
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
          //onLikeClick={handleLikeClick}
          isEditProfilePopupOpen={false} /** ??? */
          isAddPlacePopupOpen={false} /** ??? */
          isEditAvatarPopupOpen={false} /** ??? */
        />

        <Footer />

        <PopupWithForm name="create-card" title="New place" isOpen={isAddPlaceOpen} onClose={closeAllPopups}>
          <input
            id="popup_title"
            type="text"
            className="popup__input"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
          />
          <div id="popup_title_error" className="popup__input-error"></div>
          <input id="popup_link" className="popup__input" placeholder="Image link" type="url" required />
          <div id="popup_link_error" className="popup__input-error"></div>
        </PopupWithForm>

        <PopupWithForm name="edit-profile" title="Edit profile" isOpen={isEditProfileOpen} onClose={closeAllPopups}>
          <input
            id="popup_name"
            type="text"
            className="popup__input"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
            defaultValue="Jacques Cousteau"
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
            defaultValue="Explorer"
          />
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          title="Update profile picture"
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
        >
          <input id="popup_avatar_link" className="popup__input" placeholder="Avatar link" type="url" required />
          <div id="popup_avatar_link_error" className="popup__input-error"></div>
        </PopupWithForm>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </>
  );
}

export default App;
