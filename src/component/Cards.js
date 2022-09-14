import Card from "./Card";

function Cards(props) {
  return (
    <>
      {props.data.map((card) => (
        <Card
          key={card._id}
          data={card}
          id={card._id}
          ownerId={card.owner._id}
          title={card.name}
          link={card.link}
          likes={card.likes}
          userId={props.userId}
          handleDeleteCard={props.handleDeleteCard}
          onCardClick={props.onCardClick}
          handleLikeClick={props.handleLikeClick}
          isLiked={props.isLiked}
        />
      ))}
    </>
  );
}

export default Cards;
