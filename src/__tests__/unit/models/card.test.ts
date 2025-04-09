interface CardDTO {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: {
    title: string;
    templateId: string;
  }[];
}

interface Card {
  getSummary: () => CardSummary;
}

interface CardSummary {
  id: string;
  title: string;
}

const createCard = (card: CardDTO): Card => {
  const getSummary = (): CardSummary => {
    return {
      title: card.title,
    };
  };

  return {
    getSummary,
  };
};

let cardDTO = {
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
