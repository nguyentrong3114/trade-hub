import { getTranslations } from "next-intl/server";
import AuctionClient from "@/components/auction/AuctionClient";

interface AuctionItem {
  id: number;
  name: string;
  endTime: string;
  title: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  bids: number;
  imageUrl: string;
  category: string;
}

// Sample auction items - có thể lấy từ API hoặc database
const AUCTION_ITEMS: AuctionItem[] = [
  {
    id: 1,
    name: "Đồng hồ Rolex Submariner",
    endTime: "2 giờ",
    title: "Rolex Submariner Date 2024 - Mới 100%",
    description:
      "Đồng hồ Rolex Submariner Date phiên bản 2024, còn nguyên seal, đầy đủ hộp và giấy tờ.",
    currentPrice: 15200,
    startingPrice: 12500,
    bids: 23,
    imageUrl: "/img/auction/1.jpg",
    category: "Đồng hồ",
  },
  {
    id: 2,
    name: "Tranh sơn dầu cổ điển",
    endTime: "5 giờ",
    title: "Tranh sơn dầu châu Âu thế kỷ 19 - Tác phẩm hiếm",
    description:
      "Bức tranh sơn dầu cổ điển từ châu Âu, được xác thực từ thế kỷ 19.",
    currentPrice: 8900,
    startingPrice: 6000,
    bids: 15,
    imageUrl: "/img/auction/2.webp",
    category: "Nghệ thuật",
  },
  {
    id: 3,
    name: "Xe cổ điển Mercedes-Benz",
    endTime: "1 ngày",
    title: "Mercedes-Benz 300SL Gullwing 1955 - Xe cổ điển",
    description:
      "Mercedes-Benz 300SL Gullwing năm 1955, tình trạng nguyên bản, đã được phục chế chuyên nghiệp.",
    currentPrice: 125000,
    startingPrice: 100000,
    bids: 8,
    imageUrl: "/img/auction/car.jpg",
    category: "Xe cổ điển",
  },
  {
    id: 4,
    name: "Đồng hồ Rolex Submariner",
    endTime: "3 giờ",
    title: "Rolex Submariner Date 2023 - Like New",
    description:
      "Đồng hồ Rolex Submariner Date năm 2023, tình trạng như mới, đầy đủ phụ kiện.",
    currentPrice: 14200,
    startingPrice: 12000,
    bids: 18,
    imageUrl: "/img/auction/1.jpg",
    category: "Đồng hồ",
  },
  {
    id: 5,
    name: "Tranh sơn dầu hiện đại",
    endTime: "6 giờ",
    title: "Tranh sơn dầu nghệ thuật đương đại",
    description:
      "Tác phẩm nghệ thuật đương đại của họa sĩ nổi tiếng, ký tên và có giấy chứng nhận.",
    currentPrice: 6500,
    startingPrice: 5000,
    bids: 12,
    imageUrl: "/img/auction/2.webp",
    category: "Nghệ thuật",
  },
  {
    id: 6,
    name: "Xe cổ điển Mercedes-Benz",
    endTime: "2 ngày",
    title: "Mercedes-Benz 190SL 1960 - Classic Car",
    description:
      "Mercedes-Benz 190SL năm 1960, đã được phục chế hoàn toàn, động cơ hoạt động tốt.",
    currentPrice: 98000,
    startingPrice: 85000,
    bids: 11,
    imageUrl: "/img/auction/car.jpg",
    category: "Xe cổ điển",
  },
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AuctionPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("auction");

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              {t("all")}
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              {t("watches")}
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              {t("art")}
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              {t("cars")}
            </button>
          </div>
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{t("sortByPrice")}</option>
            <option>{t("sortByTime")}</option>
            <option>{t("sortByBids")}</option>
          </select>
        </div>

        {/* Auction Items with Countdown Timer */}
        <AuctionClient
          items={AUCTION_ITEMS}
          locale={locale}
          translations={{
            currentPrice: t("currentPrice"),
            startingPrice: t("startingPrice"),
            bids: t("bids"),
            viewDetails: t("viewDetails"),
            loadMore: t("loadMore"),
          }}
        />

        {/* Load More / Pagination */}
        <div className="text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            {t("loadMore")}
          </button>
        </div>
      </div>
    </div>
  );
}

