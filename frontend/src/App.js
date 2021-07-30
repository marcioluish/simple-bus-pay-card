import Travel from "./travel";

function App(props) {
  let cardsList = [];
  let cardsValuesList = [];

  props.cards.forEach((card) => {
    cardsList.push(card.id);
    cardsValuesList.push(card.value);
  });

  return (
    <>
      <Travel cardsList={cardsList} cardsValuesList={cardsValuesList} />
    </>
  );
}

export default App;
