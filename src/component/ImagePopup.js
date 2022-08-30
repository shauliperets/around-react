function ImagePopup() {
  return (
    <>
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
    </>
  );
}

export default ImagePopup;
