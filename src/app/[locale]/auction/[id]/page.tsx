import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import AuctionRoom from "@/components/auction/AuctionRoom";

export interface AuctionItem {
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

// Sample auction items - trong thực tế sẽ lấy từ API hoặc database
const AUCTION_ITEMS: AuctionItem[] = [
  {
    id: 1,
    name: "Đồng hồ Rolex Submariner",
    endTime: "2 giờ",
    title: "Rolex Submariner Date 2024 - Mới 100%",
    description:
      "Đồng hồ Rolex Submariner Date phiên bản 2024, còn nguyên seal, đầy đủ hộp và giấy tờ. Sản phẩm chính hãng, bảo hành quốc tế 5 năm. Giá khởi điểm $12,500, hiện tại đã có 23 lượt đấu giá.",
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
      "Bức tranh sơn dầu cổ điển từ châu Âu, được xác thực từ thế kỷ 19. Khung gỗ nguyên bản, tình trạng tốt. Đã có 15 lượt đấu giá, giá hiện tại $8,900.",
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
      "Mercedes-Benz 300SL Gullwing năm 1955, tình trạng nguyên bản, đã được phục chế chuyên nghiệp. Động cơ V6 hoạt động tốt, nội thất da nguyên bản. Đã có 8 lượt đấu giá.",
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
      "Đồng hồ Rolex Submariner Date năm 2023, tình trạng như mới, đầy đủ phụ kiện. Sản phẩm chính hãng, bảo hành quốc tế 4 năm còn lại.",
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
      "Tác phẩm nghệ thuật đương đại của họa sĩ nổi tiếng, ký tên và có giấy chứng nhận. Kích thước lớn, phù hợp để trưng bày trong phòng khách hoặc văn phòng.",
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
      "Mercedes-Benz 190SL năm 1960, đã được phục chế hoàn toàn, động cơ hoạt động tốt. Nội thất da nguyên bản, hệ thống điện đã được nâng cấp hiện đại.",
    currentPrice: 98000,
    startingPrice: 85000,
    bids: 11,
    imageUrl: "/img/auction/car.jpg",
    category: "Xe cổ điển",
  },
];

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function AuctionDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const t = await getTranslations("auction");
  const auctionId = parseInt(id);

  const item = AUCTION_ITEMS.find((a) => a.id === auctionId);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button - Fixed */}
      <div className="fixed top-20 left-4 z-40">
        <Link
          href={`/${locale}/auction`}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white px-4 py-2 rounded-xl font-medium text-sm transition-colors border border-gray-200 shadow-sm"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </Link>
      </div>

      <AuctionRoom
        item={item}
        locale={locale}
        translations={{
          currentPrice: t("currentPrice"),
          bids: t("bids"),
        }}
      />
    </div>
  );
}

