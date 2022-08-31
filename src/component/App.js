import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
//import "./App.css";

function App(props) {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function closeAllPopups() {
    console.log("close");
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          isEditProfilePopupOpen={false} /** ??? */
          isAddPlacePopupOpen={false} /** ??? */
          isEditAvatarPopupOpen={false} /** ??? */
        />
        <Footer />
        <PopupWithForm name="create-card" title="New place" isOpen={isAddPlaceOpen} onClose={closeAllPopups}>
          <input
            id="popup_title"
            type="text"
            class="popup__input"
            placeholder="Title"
            required
            minlength="1"
            maxlength="30"
          />
          <div id="popup_title_error" class="popup__input-error"></div>
          <input id="popup_link" class="popup__input" placeholder="Image link" type="url" required />
          <div id="popup_link_error" class="popup__input-error"></div>
        </PopupWithForm>
        <PopupWithForm name="edit-profile" title="Edit profile" isOpen={isEditProfileOpen} onClose={closeAllPopups}>
          <input
            id="popup_name"
            type="text"
            class="popup__input"
            placeholder="Name"
            required
            minlength="2"
            maxlength="40"
            value="Jacques Cousteau"
          />
          <div id="popup_name_error" class="popup__input-error"></div>
          <input
            id="popup_about_me"
            type="text"
            class="popup__input"
            placeholder="About me"
            required
            minlength="2"
            maxlength="200"
            value="Explorer"
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
        <PopupWithForm name="edit-avatar" title="Are you sure?" isOpen={false}></PopupWithForm>
        <ImagePopup isOpen={false}></ImagePopup>

        <div className="popup popup_type_edit-profile">
          <div className="popup__container popup__container_type_edit-profile">
            <form name="edit_profile" className="popup__form popup__form_type_edit-profile">
              <button className="popup__close-button popup__close-button_type_edit-profile" type="button"></button>
              <h2 className="popup__title">Edit profile</h2>
              <input
                id="popup_name"
                type="text"
                className="popup__input"
                placeholder="Name"
                required
                minlength="2"
                maxlength="40"
                value="Jacques Cousteau"
              />
              <div id="popup_name_error" className="popup__input-error"></div>
              <input
                id="popup_about_me"
                type="text"
                className="popup__input"
                placeholder="About me"
                required
                minlength="2"
                maxlength="200"
                value="Explorer"
              />
              <div id="popup_about_me_error" className="popup__input-error"></div>
              <button type="submit" className="popup__button popup__button_type_save-button">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_create-card">
          <div className="popup__container popup__container_type_create-card">
            <form name="add_card" className="popup__form popup__form_type_create-card">
              <button className="popup__close-button popup__close-button_type_create-card" type="button"></button>
              <h2 className="popup__title">New place</h2>
              <input
                id="popup_title"
                type="text"
                className="popup__input"
                placeholder="Title"
                required
                minlength="1"
                maxlength="30"
              />
              <div id="popup_title_error" className="popup__input-error"></div>
              <input id="popup_link" className="popup__input" placeholder="Image link" type="url" required />
              <div id="popup_link_error" className="popup__input-error"></div>
              <button type="submit" className="popup__button popup__button_type_create-card">
                Create
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_delete-card">
          <div className="popup__container popup__container_type_delete-card">
            <form name="delete_card" className="popup__form popup__form_type_delete-card">
              <button className="popup__close-button popup__close-button_type_delete-card" type="button"></button>
              <h2 className="popup__delete-title">Are you sure?</h2>
              <button type="submit" className="popup__button popup__button_type_delete-button">
                Yes
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_type_edit-avatar">
          <div className="popup__container popup__container_type_edit-avatar">
            <form name="edit_avatar" className="popup__form popup__form_type_edit-avatar">
              <button className="popup__close-button popup__close-button_type_edit-avatar" type="button"></button>
              <h2 className="popup__delete-title">Change profile picture</h2>
              <input id="popup_avatar_link" className="popup__input" placeholder="Avatar link" type="url" required />
              <div id="popup_avatar_link_error" className="popup__input-error"></div>
              <button type="submit" className="popup__button popup__button_type_edit-avatar">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="popup popup_float-image">
          <div className="popup__container popup__container_type_float-image">
            <div className="popup__image-container">
              <button className="popup__close-button popup__close-button_type_float-image" type="button"></button>
              <img
                src="<%=require('./images/lake-louise.png')%>"
                alt=""
                className="popup__image popup__image_type_float-image"
              />
            </div>
            <div className="popup__image-description">Description</div>
          </div>
        </div>

        <template id="card-default">
          <div className="card">
            <button className="card__delete-button" type="button">
              <img src="<%=require('./images/delete-icon.svg')%>" alt="" />
            </button>
            <img src="./images/lake-louise.png" alt="Lago di Braies" className="card__image" />
            <div className="card__title-panel">
              <h2 className="card__title">Lago di Braies</h2>
              <div className="card__like-container">
                <button className="card__like-button" type="button">
                  <img src="./images/heart.svg" className="card__icon" alt="Heart icon" />
                </button>
                <div className="card__like-counter">0</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </>
  );
}

export default App;
