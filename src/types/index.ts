export interface CardDTO {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: {
    title: string;
    templateId: string;
  }[];
}

export interface Card {
  getSummary: () => CardSummary;
}

export interface CardSummary {
  id: string;
  title: string;
  url: string;
}
