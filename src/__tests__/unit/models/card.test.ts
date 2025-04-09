import createCard from "../../../models/card";
import { Card, CardDTO, CardSize, CardTemplate } from "../../../types/index";

const cardDTO: CardDTO = {
  id: "card001",
  title: "card 1 title",
  sizes: ["sm", "md", "gt"],
  basePrice: 200,
  pages: [
    {
      title: "Front Cover",
      templateId: "template001",
    },
    {
      title: "Inside Left",
      templateId: "template002",
    },
    {
      title: "Inside Right",
      templateId: "template003",
    },
    {
      title: "Back Cover",
      templateId: "template004",
    },
  ],
};

const cardTemplatesMap: Record<string, CardTemplate> = {
  template001: {
    id: "template001",
    width: 300,
    height: 600,
    imageUrl: "/front-cover-portrait-1.jpg",
  },
  template002: {
    id: "template002",
    width: 300,
    height: 600,
    imageUrl: "",
  },
  template003: {
    id: "template003",
    width: 300,
    height: 600,
    imageUrl: "",
  },
  template004: {
    id: "template004",
    width: 300,
    height: 600,
    imageUrl: "/back-cover-portrait.jpg",
  },
  template005: {
    id: "template005",
    width: 300,
    height: 600,
    imageUrl: "/front-cover-portrait-2.jpg",
  },
  template006: {
    id: "template006",
    width: 600,
    height: 300,
    imageUrl: "/front-cover-landscape.jpg",
  },
  template007: {
    id: "template007",
    width: 600,
    height: 300,
    imageUrl: "",
  },
  template008: {
    id: "template008",
    width: 600,
    height: 300,
    imageUrl: "/back-cover-landscape.jpg",
  },
};

const cardSizeMap: Record<string, CardSize> = {
  sm: {
    id: "sm",
    title: "Small",
    priceMultiplier: 0.8,
  },
  md: {
    id: "md",
    title: "Medium",
    priceMultiplier: 1,
  },
  lg: {
    id: "lg",
    title: "Large",
    priceMultiplier: 1.4,
  },
  gt: {
    id: "gt",
    title: "Giant",
    priceMultiplier: 2,
  },
};

let card: Card = null;

describe("Card Domain", () => {
  beforeEach(() => {
    card = createCard(cardDTO, cardTemplatesMap, cardSizeMap);
  });

  describe("Card Summary", () => {
    test("returns correct summary details", () => {
      const summary = card.getSummary();
      expect(summary.title).toBe("card 1 title");
      expect(summary.imageUrl).toBe("/front-cover-portrait-1.jpg");
      expect(summary.url).toBe("/cards/card001");
    });
  });

  describe("Card Details", () => {
    test("returns correct title", () => {
      const details = card.getDetails("sm");
      expect(details.title).toBe("card 1 title");
    });

    test("returns correct size", () => {
      const details = card.getDetails("sm");
      expect(details.title).toBe("card 1 title");
    });

    test("returns correct imageUrl", () => {
      const details = card.getDetails("sm");
      expect(details.imageUrl).toBe("/front-cover-portrait-1.jpg");
    });

    test("returns correct available sizes", () => {
      const details = card.getDetails("sm");
      expect(details.availableSizes).toEqual([
        { id: "sm", title: "Small" },
        { id: "md", title: "Medium" },
        { id: "gt", title: "Giant" },
      ]);
    });

    test("returns the correct price correctly formatted", () => {
      const details = card.getDetails("sm");
      const expectedprice =
        cardDTO.basePrice * cardSizeMap["sm"].priceMultiplier;
      expect(details.price).toBe(`£${expectedprice.toFixed(2)}`);
    });

    test("if an invalid size is passed, it should throw an error", () => {
      expect(() => card.getDetails("xx")).toThrow(`Size xx not found`);
    });

    test("return the correct pages", () => {
      const details = card.getDetails("sm");
      expect(details.pages.length).toBe(4);
      expect(details.pages[0]).toMatchObject({
        title: "Front Cover",
        width: 300,
        height: 600,
        imageUrl: "/front-cover-portrait-1.jpg",
      });
    });

    test("if a card page template is not found, it should throw an error", () => {
      cardDTO.pages[0].templateId = "non-existing-template-id";
      expect(() => card.getDetails("sm")).toThrow(
        `Template with id non-existing-template-id not found`
      );
    });
  });
});
