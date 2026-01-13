"use client";

import { useState } from "react";
import { Stock, DEFAULT_STOCKS, MarketSectionProps } from "./market/types";
import { generatePriceData } from "./market/utils";
import TickerBar from "./market/TickerBar";
import SearchBar from "./market/SearchBar";
import ChartSection from "./market/ChartSection";
import StocksTable from "./market/StocksTable";

export type { DEFAULT_STOCKS };
  export type { Stock, MarketSectionProps };
export default function MarketSection({ stocks }: MarketSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const displayStocks = stocks || DEFAULT_STOCKS;

  const filteredStocks = displayStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get top 4 stocks for chart display
  const topStocks = displayStocks.slice(0, 4);
  const chartStock = selectedStock || topStocks[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ticker Bar */}
      <TickerBar stocks={displayStocks} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Thị trường chứng khoán
          </h1>
          <p className="text-lg text-gray-600">
            Theo dõi giá cổ phiếu và biến động thị trường theo thời gian thực
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Stock Chart Section */}
        <ChartSection
          stocks={displayStocks}
          selectedStock={chartStock}
          onStockSelect={setSelectedStock}
          generatePriceData={generatePriceData}
        />

        {/* Stocks Table */}
        <StocksTable stocks={filteredStocks} />

        {/* Info Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Dữ liệu được cập nhật theo thời gian thực. Giá có thể thay đổi.
          </p>
        </div>
      </div>
    </div>
  );
}
