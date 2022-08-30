//import logoImage from "../images/logo.svg";
import editButton from "../images/edit-button.svg";

function Main() {
  function handleEditAvatarClick() {
    document.querySelector(".popup_type_edit-avatar").classList.add("popup_open");
  }

  function handleEditProfileClick() {
    document.querySelector(".popup_type_edit-profile").classList.add("popup_open");
  }

  function handleAddPlaceClick() {
    document.querySelector(".popup_type_create-card").classList.add("popup_open");
  }

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__image-container">
            <img src="<%=require('./images/image.jpg')%>" alt="Profile image" className="profile__image" />
            <div className="profile__edit-avatar" onClick={handleEditAvatarClick}></div>
          </div>
          <div className="profile__content">
            <div className="profile__title-panel">
              <h1 className="profile__title">Jacques Cousteau</h1>
              <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}>
                <img className="profile__edit-image" src={editButton} alt="Edit button" />
              </button>
            </div>
            <p className="profile__subtitle">Explorer</p>
          </div>
          <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        </section>
        <section className="elements"></section>
      </main>
    </>
  );
}

export default Main;
