"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FaClock,
  FaGavel,
  FaArrowUp,
  FaTag,
  FaShieldAlt,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import type { AuctionItem } from "@/app/[locale]/auction/[id]/page";

const TERMS_CONTENT = [
  {
    title: "CHƯƠNG I. QUY ĐỊNH CHUNG",
    items: [
      "Phạm vi áp dụng: Áp dụng cho 01 sản phẩm đấu thầu/đấu giá online.",
      "Thuật ngữ: Người bán, người tham gia, phiên đấu, giá khởi điểm, bước giá, người trúng đấu.",
    ],
  },
  {
    title: "CHƯƠNG II. THÔNG TIN SẢN PHẨM",
    items: [
      "Tên sản phẩm",
      "Mô tả chi tiết",
      "Giá khởi điểm",
      "Bước giá",
      "Thời gian đấu",
      "Điều kiện thanh toán & giao hàng",
    ],
  },
  {
    title: "CHƯƠNG III. ĐIỀU KIỆN THAM GIA",
    items: [
      "Có tài khoản hợp lệ",
      "Xác thực thông tin",
      "Đồng ý quy tắc",
      "Đặt cọc (nếu có)",
    ],
  },
  {
    title: "CHƯƠNG IV. QUY TẮC ĐẤU GIÁ",
    items: [
      "Đấu giá tăng dần",
      "Giá ≥ giá hiện tại + bước giá",
      "Không hủy giá đã đặt",
      "Gia hạn thời gian nếu có giá mới phút cuối",
    ],
  },
  {
    title: "CHƯƠNG V. KẾT THÚC & KẾT QUẢ",
    items: [
      "Người trả giá cao nhất hợp lệ là người trúng đấu",
      "Hệ thống tự động thông báo",
    ],
  },
  {
    title: "CHƯƠNG VI. THANH TOÁN & GIAO HÀNG",
    items: [
      "Thanh toán trong thời hạn quy định",
      "Quá hạn: hủy kết quả, xử lý đặt cọc",
      "Giao đúng sản phẩm đã mô tả",
    ],
  },
  {
    title: "CHƯƠNG VII. VI PHẠM & TRANH CHẤP",
    items: [
      "Cấm gian lận, bot, thông đồng",
      "Xử lý theo quy định hệ thống và pháp luật",
    ],
  },
  {
    title: "CHƯƠNG VIII. HIỆU LỰC",
    items: ["Có hiệu lực kể từ ngày công bố"],
  },
];

interface Props {
  item: AuctionItem;
  locale: string;
  translations: {
    currentPrice: string;
    bids: string;
  };
}

interface BidEntry {
  id: number;
  bidder: string;
  amount: number;
  time: Date;
}

const parseEndTime = (timeString: string) => {
  const lower = timeString.toLowerCase();
  const now = Date.now();

  if (lower.includes("ngày") || lower.includes("day")) {
    const num = parseInt(lower.match(/\d+/)?.[0] || "1", 10);
    return now + num * 24 * 60 * 60 * 1000;
  }
  if (lower.includes("giờ") || lower.includes("hour")) {
    const num = parseInt(lower.match(/\d+/)?.[0] || "2", 10);
    return now + num * 60 * 60 * 1000;
  }
  if (lower.includes("phút") || lower.includes("minute")) {
    const num = parseInt(lower.match(/\d+/)?.[0] || "30", 10);
    return now + num * 60 * 1000;
  }
  return now + 2 * 60 * 60 * 1000;
};

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export default function AuctionDetailClient({ item, translations }: Props) {
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);
  const [bidCount, setBidCount] = useState(item.bids);
  const [bidAmount, setBidAmount] = useState(item.currentPrice + 50);
  const [message, setMessage] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(true);

  const [baseNow] = useState(() => Date.now());
  const [viewers, setViewers] = useState(32);
  const [watching, setWatching] = useState(12);

  const initialHistory: BidEntry[] = useMemo(
    () => [
      {
        id: 1,
        bidder: "Nguyễn Văn A",
        amount: item.currentPrice,
        time: new Date(baseNow - 5 * 60 * 1000),
      },
      {
        id: 2,
        bidder: "Trần Thị B",
        amount: Math.max(item.currentPrice - 150, item.startingPrice),
        time: new Date(baseNow - 25 * 60 * 1000),
      },
      {
        id: 3,
        bidder: "Lê Văn C",
        amount: Math.max(item.currentPrice - 300, item.startingPrice),
        time: new Date(baseNow - 45 * 60 * 1000),
      },
    ],
    [baseNow, item.currentPrice, item.startingPrice],
  );

  const [bidHistory, setBidHistory] = useState<BidEntry[]>(initialHistory);

  const endTimestamp = useMemo(() => parseEndTime(item.endTime), [item.endTime]);
  const [timeLeft, setTimeLeft] = useState(() => endTimestamp - baseNow);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(endTimestamp - Date.now(), 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTimestamp]);

  // Giả lập số người đang xem / theo dõi để phiên đấu giá sinh động hơn
  useEffect(() => {
    const timer = setInterval(() => {
      setViewers((v) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 đến +2
        return Math.max(8, v + delta);
      });
      setWatching((w) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 đến +1
        return Math.max(3, w + delta);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const timeParts = useMemo(() => {
    if (timeLeft <= 0) return { expired: true, text: "Đã kết thúc" };
    const totalSeconds = Math.floor(timeLeft / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0) return { expired: false, text: `${days}d ${hours}h ${minutes}m` };
    return { expired: false, text: `${hours}h ${minutes}m ${seconds}s` };
  }, [timeLeft]);

  const quickBids = [50, 100, 250];
  const bidderPool = ["Bạn", "Trần Văn D", "Hoàng Thị E", "Phạm Văn F"];

  // Bước giá tối thiểu theo ngưỡng giá
  const getMinStep = (price: number) => {
    if (price < 1000) return 10;
    if (price < 10000) return 50;
    if (price < 50000) return 100;
    return 500;
  };

  const minStep = getMinStep(currentPrice);

  const placeBid = () => {
    if (!acceptedTerms) {
      setMessage("Vui lòng chấp nhận quy tắc đấu giá trước khi đặt giá.");
      setShowTerms(true);
      return;
    }
    if (bidAmount < currentPrice + minStep) {
      setMessage(
        `Giá thầu phải cao hơn hoặc bằng ${formatCurrency(
          currentPrice + minStep,
        )} (bước giá tối thiểu: ${formatCurrency(minStep)})`,
      );
      return;
    }
    const newEntry: BidEntry = {
      id: Date.now(),
      bidder: bidderPool[Math.floor(Math.random() * bidderPool.length)],
      amount: bidAmount,
      time: new Date(),
    };
    setCurrentPrice(bidAmount);
    setBidCount((c) => c + 1);
    setBidHistory((prev) => [newEntry, ...prev].slice(0, 8));
    setMessage(`Đặt giá thành công: ${formatCurrency(bidAmount)}`);
  };

  return (
    <div className="relative">
      {/* Overlay điều khoản */}
      {showTerms && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">
                QUY TẮC ĐẤU THẦU / ĐẤU GIÁ ONLINE (01 SẢN PHẨM)
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Vui lòng đọc kỹ và chấp nhận để tiếp tục tham gia đấu giá.
              </p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-4">
              {TERMS_CONTENT.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                    {section.items.map((itemText) => (
                      <li key={itemText}>{itemText}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-6 py-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                Tôi đã đọc và đồng ý với quy tắc đấu giá
              </label>
              <button
                disabled={!acceptedTerms}
                onClick={() => setShowTerms(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Đồng ý & tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thanh trạng thái phiên đấu giá */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Phiên đấu giá trực tuyến
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {item.name}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <FaClock className="h-4 w-4 text-orange-500" />
            <span>
              Thời gian còn lại:{" "}
              <span className="font-semibold text-gray-900">{timeParts.text}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaUsers className="h-4 w-4 text-blue-600" />
            <span>
              <span className="font-semibold text-gray-900">{viewers}</span> người đang xem
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaGavel className="h-4 w-4 text-purple-600" />
            <span>
              <span className="font-semibold text-gray-900">{watching}</span> đang theo dõi phiên
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image / preview */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 shadow-lg">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-white text-sm">
              <FaClock className="w-4 h-4" />
              {timeParts.text}
            </div>
            <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-2 shadow">
              <p className="text-xs text-gray-500">Giá hiện tại</p>
              <p className="text-xl font-semibold text-blue-600">
                {formatCurrency(currentPrice)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">Giá khởi điểm</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(item.startingPrice)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">Đã đấu giá</p>
              <p className="text-lg font-semibold text-gray-900">{bidCount} lượt</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">Thời gian</p>
              <p className="text-lg font-semibold text-gray-900">{item.endTime}</p>
            </div>
          </div>
        </div>

        {/* Details / bidding */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <FaTag className="h-3 w-3" />
              {item.category}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              <FaClock className="h-3 w-3" />
              Còn {timeParts.text}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{item.title}</h1>
            <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">{translations.currentPrice}</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentPrice)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">Giá tối thiểu tiếp theo</p>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(currentPrice + 1)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <p className="text-xs text-gray-500">{translations.bids}</p>
              <p className="text-xl font-semibold text-gray-900">{bidCount} lượt</p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Nhập giá để đấu thầu</p>
                <p className="text-sm text-gray-700">
                  Giá phải lớn hơn hoặc bằng{" "}
                  {formatCurrency(currentPrice + minStep)}{" "}
                  (bước giá tối thiểu: {formatCurrency(minStep)})
                </p>
              </div>
              <FaGavel className="h-5 w-5 text-blue-600" />
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                value={bidAmount}
                min={currentPrice + minStep}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setBidAmount(Number(e.target.value))}
              />
              <button
                onClick={placeBid}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
              >
                <FaArrowUp className="h-4 w-4" />
                Đấu giá
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {quickBids.map((delta) => (
                <button
                  key={delta}
                  onClick={() => setBidAmount(currentPrice + delta)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600"
                >
                  +{formatCurrency(delta)}
                </button>
              ))}
            </div>

            {message && (
              <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">
                {message}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <FaGavel className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Lịch sử đấu giá</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bidHistory.map((bid) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{bid.bidder}</p>
                    <p className="text-xs text-gray-500">
                      {bid.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(bid.amount)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <FaShieldAlt className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Thông tin bổ sung</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Sản phẩm đã được xác thực và kiểm định</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Thanh toán an toàn qua hệ thống bảo đảm</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Vận chuyển toàn quốc, bảo hiểm đầy đủ</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span>Hỗ trợ 24/7 trong suốt quá trình đấu giá</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                <FaUsers className="h-3 w-3 text-blue-500" />
                Bảo vệ người mua
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                <FaShieldAlt className="h-3 w-3 text-blue-500" />
                Cam kết hoàn tiền
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 