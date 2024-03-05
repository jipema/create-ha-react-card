import React from "react";
import ReactDOM from "react-dom/client";

import Card from "./Card.tsx";
import { createReactHaCard } from "../lib/createReactHaCard.tsx";
import { mockReactCardProps } from "../utils/mock.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Card {...mockReactCardProps} />
  </React.StrictMode>
);

createReactHaCard("react-card", Card);
