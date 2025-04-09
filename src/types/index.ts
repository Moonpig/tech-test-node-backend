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
  title: string;
  imageUrl: string;
  url: string;
}

export interface CardSize {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
}
