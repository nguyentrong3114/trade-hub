"use client";

import { FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Stock } from "./types";
import StockChart from "./StockChart";

interface ChartSectionProps {
  stocks: Stock[];
  selectedStock: Stock;
  onStockSelect: (stock: Stock) => void;
  generatePriceData: (basePrice: number, days?: number) => { day: number; price: number }[];
}

export default function ChartSection({
  stocks,
  selectedStock,
  onStockSelect,
  generatePriceData,
}: ChartSectionProps) {
  const topStocks = stocks.slice(0, 4);

  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaChartLine className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Biểu đồ giá cổ phiếu</h2>
        </div>
        <div className="flex gap-2">
          {topStocks.map((stock) => (
            <button
              key={stock.id}
              onClick={() => onStockSelect(stock)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStock.id === stock.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {stock.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left compact stats */}
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Mã / Tên</p>
            <div className="mt-1">
              <p className="text-lg font-bold text-gray-900">{selectedStock.symbol}</p>
              <p className="text-sm text-gray-600 line-clamp-1">{selectedStock.name}</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Giá hiện tại</p>
            <p className="text-2xl font-bold text-gray-900">
              ${selectedStock.price.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Thay đổi</p>
            <p
              className={`text-lg font-bold flex items-center gap-1 ${
                selectedStock.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedStock.change >= 0 ? (
                <FaArrowUp className="w-4 h-4" />
              ) : (
                <FaArrowDown className="w-4 h-4" />
              )}
              {selectedStock.change > 0 ? "+" : ""}
              {selectedStock.change.toFixed(2)} ({selectedStock.changePercent > 0 ? "+" : ""}
              {selectedStock.changePercent.toFixed(2)}%)
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide">Volume</p>
              <p className="text-base font-semibold text-gray-900">
                {selectedStock.volume.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide">Market Cap</p>
              <p className="text-base font-semibold text-gray-900">{selectedStock.marketCap}</p>
            </div>
          </div>
        </div>

        {/* Chart area */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{selectedStock.name}</h3>
            <span className="text-lg font-semibold text-gray-600">
              ({selectedStock.symbol})
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <StockChart
              data={generatePriceData(selectedStock.price)}
              color={selectedStock.change >= 0 ? "#10b981" : "#ef4444"}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>30 ngày qua</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Giá tăng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Giá giảm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

