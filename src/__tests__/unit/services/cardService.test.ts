import e from "express";
import * as cardService from "../../../services/cardService";
import { CardDTO, CardSizeDTO, CardTemplateDTO } from "../../../types/index";

const mockCards: CardDTO[] = [
  {
    id: "card001",
    title: "card 1 title",
    sizes: ["sm", "md", "gt"],
    basePrice: 200,
    pages: [
      { title: "Front Cover", templateId: "template001" },
      { title: "Back Cover", templateId: "template004" },
    ],
  },
];

const mockSizes: CardSizeDTO[] = [
  { id: "sm", title: "Small", priceMultiplier: 0.8 },
  { id: "md", title: "Medium", priceMultiplier: 1 },
  { id: "gt", title: "Giant", priceMultiplier: 2 },
];

const mockTemplates: CardTemplateDTO[] = [
  {
    id: "template001",
    width: 300,
    height: 600,
    imageUrl: "/front-cover-portrait-1.jpg",
  },
  {
    id: "template004",
    width: 300,
    height: 600,
    imageUrl: "/back-cover-portrait.jpg",
  },
];

global.fetch = jest.fn();

function mockFetchAll() {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockCards,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockSizes,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockTemplates,
    });
}

describe("cardService", () => {
  it("getCardsList returns expected card summaries", async () => {
    mockFetchAll();
    const list = await cardService.getCardsList();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(1);
    expect(list[0]).toHaveProperty("title", "card 1 title");
    expect(list[0]).toHaveProperty("imageUrl", "/front-cover-portrait-1.jpg");
    expect(list[0]).toHaveProperty("url", "/cards/card001");
  });

  it("getCardDetail returns card details", async () => {
    mockFetchAll();
    const detail = await cardService.getCardDetail("card001", "gt");
    expect(detail).not.toBeNull();
    if (detail) {
      expect(detail.price).toBe("£400.00");
      expect(detail.title).toBe("card 1 title");
      expect(detail.size).toBe("gt");
      expect(detail.imageUrl).toBe("/front-cover-portrait-1.jpg");
      expect(detail.availableSizes.length).toBe(3);
    }
  });
});
