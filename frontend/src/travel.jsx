import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, FormGroup } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 175,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  page: {
    position: "absolute",
    textAlign: "center",
    top: "60%",
    transform: "translate(-50%, -60%)",
    left: "50%",
  },
  formControl: {
    marginRight: theme.spacing(5),
    minWidth: 120,
    marginBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(2),
    maxWidth: 120,
  },
}));

export default function Travel(props) {
  const classes = useStyles();

  // Hooks
  const [card, setCards] = useState([]);
  const [line, setLines] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [originId, setOriginId] = useState([]);
  const [destination, setDestination] = useState([]);
  const [destinationId, setDestinationId] = useState([]);
  const [credit, setCredit] = useState([]);
  const [lineTax, setLineTax] = useState([]);
  const [multiplier, setMultiplier] = useState([]);

  // Consts
  const cardsList = props.cardsList;
  const cardsValuesList = props.cardsValuesList;
  const regionsList = ["Continente", "Centro", "Norte", "Sul", "Leste"];
  const linesList = ["Comum", "Executiva"];
  const tax = 0.6;
  const total = lineTax + tax * multiplier;

  useEffect(() => {
    if (originId > 0 && destinationId > 0) {
      let aux;
      let sum = (originId + destinationId).toFixed(1);

      if (sum == 4.4) {
        setMultiplier(1);
        aux = 1;
      } else {
        if (sum == 6.3 || sum == 5.4) {
          setMultiplier(2);
          aux = 2;
        } else {
          aux = parseInt(originId) - parseInt(destinationId);
          if (aux < 0) {
            aux = aux * -1;
          }
        }
      }
      setMultiplier(aux);
    }
  }, [originId, destinationId]);

  const searchValue = (id) => {
    let aux;
    props.cards.forEach((card) => {
      if (card.id == id) {
        aux = parseFloat(card.value);
        console.log("1");
      }
    });
    return aux;
  };

  const cardSelected = (event) => {
    let value = searchValue(event.target.value);
    setCards(event.target.value);
    setCredit(value);
  };

  const lineSelected = (event) => {
    setLines(event.target.value);
    if (event.target.value === "Comum") {
      setLineTax(4);
    } else {
      setLineTax(7);
    }
  };

  const originSelected = (event) => {
    let aux;
    switch (event.target.value) {
      case "Continente":
        aux = 3.1;
        break;
      case "Norte":
        aux = 3.2;
        break;
      case "Centro":
        aux = 2.1;
        break;
      case "Leste":
        aux = 2.3;
        break;
      case "Sul":
        aux = 1;
        break;
      default:
        aux = null;
        break;
    }
    setOrigin(event.target.value);
    setOriginId(aux);
  };

  const destinationSelected = (event) => {
    let aux;
    switch (event.target.value) {
      case "Continente":
        aux = 3.1;
        break;
      case "Norte":
        aux = 3.2;
        break;
      case "Centro":
        aux = 2.1;
        break;
      case "Leste":
        aux = 2.3;
        break;
      case "Sul":
        aux = 1;
        break;
      default:
        aux = null;
        break;
    }
    setDestination(event.target.value);
    setDestinationId(aux);
  };

  function clear() {
    setCards("");
    setLines("");
    setOrigin("");
    setOriginId("");
    setDestination("");
    setDestinationId("");
    setCredit("");
    setLineTax("");
    setMultiplier("");
  }

  return (
    <div className={classes.page}>
      <FormGroup className="mb-3">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"> Cartão </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={card}
            onChange={cardSelected}
            label="Cartão"
            MenuProps={MenuProps}
          >
            {cardsList.map((card) => (
              <MenuItem value={card}> {card} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>Saldo: R${credit > 0 ? `${credit}` : `0`}</div>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"> Linha </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={line}
            onChange={lineSelected}
            label="Linha"
            MenuProps={MenuProps}
          >
            {linesList.map((line) => (
              <MenuItem value={line}> {line} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"> Origem </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={origin}
            onChange={originSelected}
            label="Origem"
            MenuProps={MenuProps}
          >
            {regionsList.map((origin) => (
              <MenuItem value={origin}> {origin} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label"> Destino </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={destination}
            onChange={destinationSelected}
            label="Destino"
            MenuProps={MenuProps}
          >
            {regionsList.map((destination) => (
              <MenuItem value={destination}> {destination} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>Total: R${total ? `${total}` : `0`}</div>

        <Button
          onClick={() => pay(card, total, clear)}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Pagar
        </Button>
      </FormGroup>
    </div>
  );
}

const pay = (card, total, clear) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let id = String(card);
  let value = String(total * -1);

  axios
    .put(
      "/cards/",
      {
        id: id,
        value: value,
      },
      {
        headers: headers,
      }
    )
    .then((response) => {
      clear();
    })
    .catch((error) => {
      alert(`Error updating card value: ${error}`);
    });
};
