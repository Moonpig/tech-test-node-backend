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
  getDetails: (size: string) => CardDetails;
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

export interface CardDetails {
  title: string;
  size: string;
  //   availableSizes: {
  //     id: string;
  //     title: string;
  //   }[];
  imageUrl: string;
  //   price: number;
  //   pages: {
  //     title: string;
  //     width: number;
  //     height: number;
  //     imageUrl: string;
  //   };
}
