"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGavel, FaArrowRight, FaFire, FaUsers, FaTrophy } from "react-icons/fa";
import CountdownTimer from "./CountdownTimer";

interface AuctionItem {
  id: number;
  name: string;
  endTime: string | Date;
  title: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  bids: number;
  imageUrl: string;
  category: string;
}

interface AuctionClientProps {
  items: AuctionItem[];
  locale: string;
  translations: {
    currentPrice: string;
    startingPrice: string;
    bids: string;
    viewDetails: string;
    loadMore: string;
  };
}

// Helper function to convert string time to Date
const parseEndTime = (timeString: string): Date => {
  const now = new Date();
  const lowerTime = timeString.toLowerCase();

  if (lowerTime.includes("giờ") || lowerTime.includes("hour")) {
    const hours = parseInt(lowerTime.match(/\d+/)?.[0] || "0");
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
  } else if (lowerTime.includes("ngày") || lowerTime.includes("day")) {
    const days = parseInt(lowerTime.match(/\d+/)?.[0] || "0");
    return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  } else if (lowerTime.includes("phút") || lowerTime.includes("minute")) {
    const minutes = parseInt(lowerTime.match(/\d+/)?.[0] || "0");
    return new Date(now.getTime() + minutes * 60 * 1000);
  }

  // Default: add 2 hours
  return new Date(now.getTime() + 2 * 60 * 60 * 1000);
};

export default function AuctionClient({ items, locale, translations }: AuctionClientProps) {
  const hotItem = items[0];
  const otherItems = items.slice(1, 4);
  const remainingItems = items.slice(4);

  return (
    <>
      {/* Featured Hot Item */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <FaFire className="w-6 h-6 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900">
            Hiện vật hot nhất đang đấu giá
          </h2>
        </div>

        {hotItem && (
          <Link
            href={`/${locale}/auction/${hotItem.id}`}
            className="group block bg-linear-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <Image
                  src={hotItem.imageUrl}
                  alt={hotItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                {/* Hot Badge */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg">
                    <FaFire className="w-4 h-4 animate-pulse" />
                    <span className="font-bold text-sm">HOT</span>
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                    {hotItem.category}
                  </span>
                </div>
                {/* Countdown Timer */}
                <div className="absolute bottom-6 left-6">
                  <CountdownTimer
                    endTime={typeof hotItem.endTime === "string" ? parseEndTime(hotItem.endTime) : hotItem.endTime}
                    variant="card"
                    showIcon={true}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {hotItem.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {hotItem.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <FaGavel className="w-4 h-4" />
                        <span className="text-xs">Lượt đấu giá</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{hotItem.bids}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <FaUsers className="w-4 h-4" />
                        <span className="text-xs">Người tham gia</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{hotItem.bids + 12}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <FaTrophy className="w-4 h-4" />
                        <span className="text-xs">Giá cao nhất</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        ${hotItem.currentPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Giá hiện tại</p>
                      <p className="text-4xl font-bold">
                        ${hotItem.currentPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90 mb-1">Giá khởi điểm</p>
                      <p className="text-xl font-semibold line-through opacity-75">
                        ${hotItem.startingPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <span>Đặt giá thầu ngay</span>
                    <FaArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Other Featured Items - 3 items */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Sản phẩm đấu giá khác
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherItems.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/auction/${item.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
                {/* Countdown Timer */}
                <div className="absolute top-4 right-4">
                  <CountdownTimer
                    endTime={typeof item.endTime === "string" ? parseEndTime(item.endTime) : item.endTime}
                    variant="badge"
                    showIcon={true}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Price and Bids */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{translations.currentPrice}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${item.currentPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">{translations.startingPrice}</p>
                      <p className="text-sm font-semibold text-gray-700">
                        ${item.startingPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaGavel className="w-4 h-4 text-blue-600" />
                      <span>
                        {item.bids} {translations.bids}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                      <span>{translations.viewDetails}</span>
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Other Items Grid */}
      {remainingItems.length > 0 && (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Tất cả sản phẩm đấu giá
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {remainingItems.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/auction/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  {/* Countdown Timer */}
                  <div className="absolute top-4 right-4">
                    <CountdownTimer
                      endTime={typeof item.endTime === "string" ? parseEndTime(item.endTime) : item.endTime}
                      variant="badge"
                      showIcon={true}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price and Bids */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{translations.currentPrice}</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${item.currentPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">{translations.startingPrice}</p>
                        <p className="text-sm font-semibold text-gray-700">
                          ${item.startingPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaGavel className="w-4 h-4 text-blue-600" />
                        <span>
                          {item.bids} {translations.bids}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                        <span>{translations.viewDetails}</span>
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

