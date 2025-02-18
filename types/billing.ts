export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPack = {
  id: PackId;
  name: string;
  stripeName: string;
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export const CreditsPack: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    stripeName: "ScrapeFlow: Large Pack - 10,000 credits",
    label: "1,000 credits",
    credits: 1000,
    price: 999, //In cents
    priceId: process.env.STRIPE_SMALL_PACK_PRICE_ID!,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    stripeName: "ScrapeFlow: Medium Pack - 5,000 credits",
    label: "5,000 credits",
    credits: 5000,
    price: 3999, //In cents
    priceId: process.env.STRIPE_MEDIUM_PACK_PRICE_ID!,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    stripeName: "ScrapeFlow: Large Pack - 10,000 credits",
    label: "10,000 credits",
    credits: 10000,
    price: 6999, //In cents
    priceId: process.env.STRIPE_LARGE_PACK_PRICE_ID!,
  },
];

export const getCreditsPack = (id: PackId) =>
  CreditsPack.find((p) => p.id === id);
