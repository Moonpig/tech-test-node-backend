import { CardDTO, Card, CardSummary } from "../types/index";

const createCard = (card: CardDTO): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
      id: card.id,
    };
  };

  return {
    getSummary,
  };
};

export default createCard;
