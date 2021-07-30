import Travel from "./travel";

function App(props) {
  let cardsList = [];

  props.cards.forEach((card) => {
    cardsList.push(card.id);
  });

  return (
    <>
      <Travel cards={props.cards} cardsList={cardsList} />
    </>
  );
}

export default App;
