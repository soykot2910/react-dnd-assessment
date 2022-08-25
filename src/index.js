import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import "./styles.css";
import App from "./App";

function Root() {
  return (
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
