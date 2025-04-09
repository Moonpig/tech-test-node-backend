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
    const cardSize = cardSizes.find((s) => s.id === size);
    if (!cardSize) {
      throw new Error(`Size ${size} not found`);
    }

    return {
      title: card.title,
      size,
      imageUrl: templates[0].imageUrl,
      availableSizes: cardSizes
        .filter((cardSize) => card.sizes.includes(cardSize.id))
        .map((availableSize) => {
          return { id: availableSize.id, title: availableSize.title };
        }),
      price:
        card.basePrice * cardSizes.find((s) => s.id === size).priceMultiplier,
      pages: card.pages.map((page) => {
        const template = templates.find((t) => t.id === page.templateId);

        return {
          title: page.title,
          width: template.width,
          height: template.height,
          imageUrl: template.imageUrl,
        };
      }),
    };
  };

  return {
    getSummary,
    getDetails,
  };
};

export default createCard;
