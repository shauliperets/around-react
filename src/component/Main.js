//import logoImage from "../images/logo.svg";
import editButton from "../images/edit-button.svg";
import profilePicture from "../images/image.jpg";

function Main(props) {
  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__image-container">
            <img src={profilePicture} alt="Profile image" className="profile__image" />
            <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
          </div>
          <div className="profile__content">
            <div className="profile__title-panel">
              <h1 className="profile__title">Jacques Cousteau</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
                <img className="profile__edit-image" src={editButton} alt="Edit button" />
              </button>
            </div>
            <p className="profile__subtitle">Explorer</p>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
        </section>
        <section className="elements"></section>
      </main>
    </>
  );
}

export default Main;
