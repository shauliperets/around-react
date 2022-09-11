import whiteHeartIcon from "../images/heart.svg";
import blackHeartIcon from "../images/heart-black.svg";
import binIcon from "../images/delete-icon.svg";

function Cards(props) {
  function isOwned(ownerId) {
    return props.userId === ownerId;
  }

  return (
    <>
      {props.data.map((card) => (
        <div className="card" key={card._id} card_id={card._id}>
          <button
            className={
              isOwned(card.owner._id) ? "card__delete-button card__delete-button_active" : "card__delete-button"
            }
            type="button"
            onClick={props.handleDeleteCard}
          >
            <img src={binIcon} alt="" />
          </button>
          <img src={card.link} alt={card.name} className="card__image" onClick={props.onCardClick} />
          <div className="card__title-panel">
            <h2 className="card__title">{card.name}</h2>
            <div className="card__like-container">
              <button
                className="card__like-button"
                type="button"
                onClick={() => {
                  props.handleLikeClick(card);
                }}
              >
                <img
                  src={props.isLiked(card, props.userId) ? blackHeartIcon : whiteHeartIcon}
                  className="card__icon"
                  alt="Heart icon"
                />
              </button>
              <div className="card__like-counter">{card.likes.length}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Cards;
