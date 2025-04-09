import { Request, Response } from "express";
import * as cardService from "../services/cardService";

export const listCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await cardService.getCardsList();
    res.json(cards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCardDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cardId, sizeId } = req.params;
  try {
    const cardDetail = await cardService.getCardDetail(cardId, sizeId);
    if (!cardDetail) {
      res.status(404).json({ message: "Card not found." });
      return;
    }
    res.json(cardDetail);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
