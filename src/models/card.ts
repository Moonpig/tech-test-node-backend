import { title } from "process";
import {
  CardDTO,
  Card,
  CardSummary,
  CardSize,
  CardDetails,
} from "../types/index";

const createCard = (card: CardDTO, sizes: CardSize[]): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
      imageUrl: sizes[0].imageUrl,
      url: `/cards/${card.id}`,
    };
  };

  const getDetails = (size: string): CardDetails => {
    return {
      title: card.title,
      size,
      imageUrl: sizes[0].imageUrl,
    };
  };

  return {
    getSummary,
    getDetails,
  };
};

export default createCard;
