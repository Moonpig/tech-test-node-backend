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
  templatesMap: Record<string, CardTemplate>,
  cardSizesMap: Record<string, CardSize>
): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
      imageUrl: templatesMap[card.pages[0].templateId].imageUrl || "",
      url: `/cards/${card.id}`,
    };
  };

  const getDetails = (size: string): CardDetails => {
    const cardSize = cardSizesMap[size];
    if (!cardSize) {
      throw new Error(`Size ${size} not found`);
    }

    const pages = card.pages.map((page) => {
      const template = templatesMap[page.templateId];
      if (!template) {
        throw new Error(`Template with id ${page.templateId} not found`);
      }

      return {
        title: page.title,
        width: template.width,
        height: template.height,
        imageUrl: template.imageUrl,
      };
    });

    return {
      title: card.title,
      size,
      imageUrl: pages.length ? pages[0].imageUrl : "",
      availableSizes: card.sizes
        .map((id) => cardSizesMap[id])
        .filter((size): size is CardSize => !!size)
        .map((size) => ({ id: size.id, title: size.title })),
      price: card.basePrice * cardSizesMap[cardSize.id].priceMultiplier,
      pages,
    };
  };

  return {
    getSummary,
    getDetails,
  };
};

export default createCard;
