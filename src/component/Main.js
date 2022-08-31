//import logoImage from "../images/logo.svg";
import editButton from "../images/edit-button.svg";
import profilePicture from "../images/image.jpg";
import { api } from "../utils/api";
import React from "react";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  React.useEffect(() => {
    api.getUserInfo().then((result) => {
      //console.log("api result =>", result);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);
    });
  }, []);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__image-container">
            <img src={userAvatar} alt="Profile image" className="profile__image" />
            <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
          </div>
          <div className="profile__content">
            <div className="profile__title-panel">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
                <img className="profile__edit-image" src={editButton} alt="Edit button" />
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
        </section>
        <section className="elements"></section>
      </main>
    </>
  );
}

export default Main;
