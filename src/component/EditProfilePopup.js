import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  //const [userDescription, setUserDescription] = React.useState("");

  function updateProfileName(event) {
    //setProfileName(event.target.value);
    //console.log("event=>", event.target.value);

    //currentUser.name = event.target.value;
    //console.log("currentUser=>", currentUser);
    //setCurrentUser(currentUser);
    setName(event.target.value);
  }

  function updateProfileAbout(event) {
    //setProfileAbout(event.target.value);
    //currentUser.about = event.target.value;
    setAbout(event.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      handleSubmit={props.onSubmit}
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={props.button}
    >
      <input
        id="popup_name"
        type="text"
        className="popup__input"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
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
        value={about || ""}
        onChange={(event) => updateProfileAbout(event)}
      />
      <div id="popup_about_me_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
