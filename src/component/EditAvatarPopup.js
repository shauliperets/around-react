import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

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
        ref={avatarRef}
        required
      />
      <div id="popup_avatar_link_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
