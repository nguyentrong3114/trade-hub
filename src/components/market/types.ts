export interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
}

export interface MarketSectionProps {
  stocks?: Stock[];
}

export const DEFAULT_STOCKS: Stock[] = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45234567,
    marketCap: "2.8T",
  },
  {
    id: 2,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 23456789,
    marketCap: "1.8T",
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    volume: 34567890,
    marketCap: "2.9T",
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 145.23,
    change: -0.89,
    changePercent: -0.61,
    volume: 45678901,
    marketCap: "1.5T",
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.50,
    change: 12.34,
    changePercent: 5.22,
    volume: 56789012,
    marketCap: "790B",
  },
  {
    id: 6,
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 485.20,
    change: 8.90,
    changePercent: 1.87,
    volume: 34567890,
    marketCap: "1.2T",
  },
  {
    id: 7,
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.50,
    change: 25.30,
    changePercent: 2.98,
    volume: 67890123,
    marketCap: "2.1T",
  },
  {
    id: 8,
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 156.78,
    change: -2.45,
    changePercent: -1.54,
    volume: 23456789,
    marketCap: "450B",
  },
  {
    id: 9,
    symbol: "V",
    name: "Visa Inc.",
    price: 267.45,
    change: 3.21,
    changePercent: 1.21,
    volume: 12345678,
    marketCap: "550B",
  },
  {
    id: 10,
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 162.34,
    change: -1.12,
    changePercent: -0.68,
    volume: 9876543,
    marketCap: "430B",
  },
];

