import {
  CardDTO,
  CardSizeDTO,
  CardTemplateDTO,
  CardSummary,
} from "../types/index";
import createCard from "../models/card";

const CARDS_URL = "https://moonpig.github.io/tech-test-node-backend/cards.json";
const SIZES_URL = "https://moonpig.github.io/tech-test-node-backend/sizes.json";
const TEMPLATES_URL =
  "https://moonpig.github.io/tech-test-node-backend/templates.json";

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return await res.json();
};

const fetchRemoteData = async (): Promise<{
  cards: CardDTO[];
  sizes: CardSizeDTO[];
  templates: CardTemplateDTO[];
}> => {
  const [cardDTOs, cardSizesDTOs, cardTemplatesDTOs] = await Promise.all([
    fetchJson<CardDTO[]>(CARDS_URL),
    fetchJson<CardSizeDTO[]>(SIZES_URL),
    fetchJson<CardTemplateDTO[]>(TEMPLATES_URL),
  ]);
  return {
    cards: cardDTOs,
    sizes: cardSizesDTOs,
    templates: cardTemplatesDTOs,
  };
};

export const getCardsList = async (): Promise<CardSummary[]> => {
  const { cards, sizes, templates } = await fetchRemoteData();
  const sizesMap = sizes.reduce<Record<string, CardSizeDTO>>((map, size) => {
    map[size.id] = size;
    return map;
  }, {});
  const templatesMap = templates.reduce<Record<string, CardTemplateDTO>>(
    (map, template) => {
      map[template.id] = template;
      return map;
    },
    {}
  );

  return cards.map((CardDTO) => {
    const card = createCard(CardDTO, templatesMap, sizesMap);
    return card.getSummary();
  });
};
