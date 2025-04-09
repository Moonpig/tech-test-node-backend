import { title } from "process";
import {
  CardDTO,
  Card,
  CardSummary,
  CardTemplate,
  CardDetails,
  CardSize,
} from "../types/index";

const createCard = (
  card: CardDTO,
  templates: CardTemplate[],
  cardSizes: CardSize[]
): Card => {
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
      availableSizes: cardSizes
        .filter((cardSize) => card.sizes.includes(cardSize.id))
        .map((availableSize) => {
          return { id: availableSize.id, title: availableSize.title };
        }),
    };
  };

  return {
    getSummary,
    getDetails,
  };
};

export default createCard;
