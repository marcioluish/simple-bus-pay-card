import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const retrieveCards = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/cards/")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

function callBackEnd() {
  let response;
  try {
    response = retrieveCards();
  } catch (error) {
    throw new Error(`Error retrieving cards from DB: ${error}`);
  }
  return response;
}

callBackEnd().then((response) => {
  if (response.status === 200) {
    ReactDOM.render(
      <React.StrictMode>
        <App cards={response.data} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
});
