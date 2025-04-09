import { CardDTO, Card, CardSummary, CardSize } from "../types/index";

const createCard = (card: CardDTO, sizes: CardSize[]): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
      imageUrl: sizes[0].imageUrl,
      url: `/cards/${card.id}`,
    };
  };

  return {
    getSummary,
  };
};

export default createCard;
