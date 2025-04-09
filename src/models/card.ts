import { title } from "process";
import {
  CardDTO,
  Card,
  CardSummary,
  CardTemplate,
  CardDetails,
} from "../types/index";

const createCard = (card: CardDTO, templates: CardTemplate[]): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
      imageUrl: templates[0].imageUrl,
      url: `/cards/${card.id}`,
    };
  };

  const getDetails = (size: string): CardDetails => {
    return {
      title: card.title,
      size,
      imageUrl: templates[0].imageUrl,
    };
  };

  return {
    getSummary,
    getDetails,
  };
};

export default createCard;
