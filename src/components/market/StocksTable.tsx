"use client";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Stock } from "./types";

interface StocksTableProps {
  stocks: Stock[];
}

export default function StocksTable({ stocks }: StocksTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mã
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tên công ty
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thay đổi
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                %
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Khối lượng
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vốn hóa
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr
                key={stock.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-gray-900">
                    {stock.symbol}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{stock.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-semibold text-gray-900">
                    ${stock.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`font-semibold flex items-center justify-end gap-1 ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change >= 0 ? (
                      <FaArrowUp className="w-3 h-3" />
                    ) : (
                      <FaArrowDown className="w-3 h-3" />
                    )}
                    {stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`font-semibold ${
                      stock.changePercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stock.changePercent > 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-gray-700">
                    {(stock.volume / 1000000).toFixed(2)}M
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-gray-700">${stock.marketCap}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

