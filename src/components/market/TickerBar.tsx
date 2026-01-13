"use client";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Stock } from "./types";

interface TickerBarProps {
  stocks: Stock[];
}

export default function TickerBar({ stocks }: TickerBarProps) {
  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="flex animate-scroll">
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={`${stock.id}-${index}`}
            className="flex items-center gap-4 px-6 shrink-0 border-r border-gray-700"
          >
            <span className="font-bold text-sm">{stock.symbol}</span>
            <span className="text-sm">${stock.price.toFixed(2)}</span>
            <span
              className={`text-sm flex items-center gap-1 ${
                stock.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {stock.change >= 0 ? (
                <FaArrowUp className="w-3 h-3" />
              ) : (
                <FaArrowDown className="w-3 h-3" />
              )}
              {stock.changePercent > 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

