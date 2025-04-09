import express from "express";
import * as cardController from "./controllers/cardController";

export const app = express();

app.set("json spaces", 2);

app.get("/cards", cardController.listCards);
app.get("/cards/:cardId/:sizeId?", cardController.getCardDetails);
