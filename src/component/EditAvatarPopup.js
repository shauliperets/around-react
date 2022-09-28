import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  //const [avatar, setAvatar] = React.useState("");
  const avatarRef = React.useRef();

  /*
  function updateAvatar(event) {
    //setAvatar(event.target.value);
    console.log("event.target.value =>", event.target.value);
    //avatarRef.current.value = "123" + event.target.value;
    console.log("avatarRef.current.value =>", avatarRef.current.value);
  }*/

  return (
    <PopupWithForm
      name="edit-avatar"
      handleSubmit={props.onSubmit}
      title="Update profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={props.button}
    >
      <input
        id="popup_avatar_link"
        className="popup__input"
        placeholder="Avatar link"
        type="url"
        //value={avatar || ""}
        ref={avatarRef}
        //onChange={(event) => updateAvatar(event)}
        required
      />
      <div id="popup_avatar_link_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
