import createCard from "../../../models/card";
import { CardDTO } from "../../../types/index";

let cardDTO: CardDTO = {
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

describe("Card Domain", () => {
  const card = createCard(cardDTO);

  test("getSummary returns correct summary details", () => {
    const summary = card.getSummary();
    expect(summary.title).toBe("card 1 title");
    expect(summary.id).toBe("card001");
  });
});
