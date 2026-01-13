"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaGavel,
  FaUsers,
  FaComments,
  FaPaperPlane,
  FaCrown,
  FaFire,
  FaBolt,
  FaCheckCircle,
  FaTrophy,
  FaExclamationTriangle,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaInfoCircle,
  FaHeart,
  FaEye,
  FaUserSecret,
} from "react-icons/fa";
import type { AuctionItem } from "@/app/[locale]/auction/[id]/page";

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
  avatar: string;
  amount: number;
  time: Date;
  isYou?: boolean;
  isAnonymous?: boolean;
}

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: Date;
  type: "message" | "system" | "bid";
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  bidCount: number;
}

const AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
];

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
    items: ["Tên sản phẩm", "Mô tả chi tiết", "Giá khởi điểm", "Bước giá"],
  },
  {
    title: "CHƯƠNG III. ĐIỀU KIỆN THAM GIA",
    items: ["Có tài khoản hợp lệ", "Xác thực thông tin", "Đồng ý quy tắc"],
  },
  {
    title: "CHƯƠNG IV. QUY TẮC ĐẤU GIÁ",
    items: [
      "Đấu giá tăng dần",
      "Giá ≥ giá hiện tại + bước giá",
      "Không hủy giá đã đặt",
    ],
  },
];

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

export default function AuctionRoom({ item }: Props) {
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);
  const [bidCount, setBidCount] = useState(item.bids);
  const [bidAmount, setBidAmount] = useState(item.currentPrice + 100);
  const [message, setMessage] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNewBidEffect, setShowNewBidEffect] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const bidHistoryRef = useRef<HTMLDivElement>(null);

  const [baseNow] = useState(() => Date.now());
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 50) + 30);
  const [watching, setWatching] = useState(Math.floor(Math.random() * 20) + 10);

  // Initial participants
  const [participants] = useState<Participant[]>([
    { id: 1, name: "Nguyễn Văn A", avatar: AVATARS[0], isOnline: true, bidCount: 5 },
    { id: 2, name: "Trần Thị B", avatar: AVATARS[1], isOnline: true, bidCount: 3 },
    { id: 3, name: "Lê Văn C", avatar: AVATARS[2], isOnline: true, bidCount: 2 },
    { id: 4, name: "Phạm Thị D", avatar: AVATARS[3], isOnline: false, bidCount: 1 },
    { id: 5, name: "Hoàng Văn E", avatar: AVATARS[4], isOnline: true, bidCount: 4 },
  ]);

  // Initial bid history
  const initialHistory: BidEntry[] = useMemo(
    () => [
      {
        id: 1,
        bidder: "Nguyễn Văn A",
        avatar: AVATARS[0],
        amount: item.currentPrice,
        time: new Date(baseNow - 5 * 60 * 1000),
      },
      {
        id: 2,
        bidder: "Trần Thị B",
        avatar: AVATARS[1],
        amount: Math.max(item.currentPrice - 150, item.startingPrice),
        time: new Date(baseNow - 15 * 60 * 1000),
      },
      {
        id: 3,
        bidder: "Lê Văn C",
        avatar: AVATARS[2],
        amount: Math.max(item.currentPrice - 300, item.startingPrice),
        time: new Date(baseNow - 30 * 60 * 1000),
      },
    ],
    [baseNow, item.currentPrice, item.startingPrice],
  );

  const [bidHistory, setBidHistory] = useState<BidEntry[]>(initialHistory);

  // Initial chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: "Hệ thống",
      avatar: "",
      message: "Chào mừng bạn đến phòng đấu giá! Hãy tuân thủ quy tắc.",
      time: new Date(baseNow - 60 * 60 * 1000),
      type: "system",
    },
    {
      id: 2,
      user: "Nguyễn Văn A",
      avatar: AVATARS[0],
      message: "Sản phẩm này đẹp quá!",
      time: new Date(baseNow - 30 * 60 * 1000),
      type: "message",
    },
    {
      id: 3,
      user: "Trần Thị B",
      avatar: AVATARS[1],
      message: "Mình cũng thích, sẽ tham gia đấu giá",
      time: new Date(baseNow - 20 * 60 * 1000),
      type: "message",
    },
  ]);

  const endTimestamp = useMemo(() => parseEndTime(item.endTime), [item.endTime]);
  const [timeLeft, setTimeLeft] = useState(() => endTimestamp - baseNow);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(endTimestamp - Date.now(), 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTimestamp]);

  // Simulate viewers fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setViewers((v) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(20, v + delta);
      });
      setWatching((w) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(5, w + delta);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Simulate random bids from other users
  useEffect(() => {
    if (showTerms) return;
    
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomBidder = participants[Math.floor(Math.random() * participants.length)];
        const minStep = getMinStep(currentPrice);
        const increment = minStep * (Math.floor(Math.random() * 3) + 1);
        const newAmount = currentPrice + increment;
        
        const newBid: BidEntry = {
          id: Date.now(),
          bidder: randomBidder.name,
          avatar: randomBidder.avatar,
          amount: newAmount,
          time: new Date(),
        };
        
        setCurrentPrice(newAmount);
        setBidCount((c) => c + 1);
        setBidHistory((prev) => [newBid, ...prev].slice(0, 10));
        setBidAmount(newAmount + minStep);
        
        // Add system message for new bid
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            user: "Hệ thống",
            avatar: "",
            message: `🔨 ${randomBidder.name} vừa đấu giá ${formatCurrency(newAmount)}!`,
            time: new Date(),
            type: "bid",
          },
        ]);
        
        // Show new bid effect
        setShowNewBidEffect(true);
        setTimeout(() => setShowNewBidEffect(false), 1500);
      }
    }, 8000);
    
    return () => clearInterval(timer);
  }, [showTerms, currentPrice, participants]);

  // Auto scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Auto scroll bid history
  useEffect(() => {
    if (bidHistoryRef.current) {
      bidHistoryRef.current.scrollTop = 0;
    }
  }, [bidHistory]);

  const timeParts = useMemo(() => {
    if (timeLeft <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(timeLeft / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { expired: false, days, hours, minutes, seconds };
  }, [timeLeft]);

  const isUrgent = timeLeft < 30 * 60 * 1000; // Less than 30 minutes

  const getMinStep = (price: number) => {
    if (price < 1000) return 10;
    if (price < 10000) return 50;
    if (price < 50000) return 100;
    return 500;
  };

  const minStep = getMinStep(currentPrice);
  const quickBids = [minStep, minStep * 2, minStep * 5];

  const placeBid = useCallback(() => {
    if (!acceptedTerms) {
      setMessage("Vui lòng chấp nhận quy tắc đấu giá trước khi đặt giá.");
      setShowTerms(true);
      return;
    }
    if (bidAmount < currentPrice + minStep) {
      setMessage(
        `Giá thầu phải cao hơn hoặc bằng ${formatCurrency(currentPrice + minStep)}`,
      );
      return;
    }

    const displayName = isAnonymous ? "Ẩn danh" : "Bạn";
    const newEntry: BidEntry = {
      id: Date.now(),
      bidder: displayName,
      avatar: isAnonymous ? "" : AVATARS[5],
      amount: bidAmount,
      time: new Date(),
      isYou: true,
      isAnonymous,
    };

    setCurrentPrice(bidAmount);
    setBidCount((c) => c + 1);
    setBidHistory((prev) => [newEntry, ...prev].slice(0, 10));
    setMessage(`🎉 Đặt giá thành công: ${formatCurrency(bidAmount)}${isAnonymous ? " (Ẩn danh)" : ""}`);
    setBidAmount(bidAmount + minStep);

    // Add to chat
    const chatDisplayName = isAnonymous ? "Người dùng ẩn danh" : "Bạn";
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "Hệ thống",
        avatar: "",
        message: `🔨 ${chatDisplayName} vừa đấu giá ${formatCurrency(bidAmount)}!`,
        time: new Date(),
        type: "bid",
      },
    ]);

    setShowNewBidEffect(true);
    setTimeout(() => setShowNewBidEffect(false), 1500);
  }, [acceptedTerms, bidAmount, currentPrice, minStep, isAnonymous]);

  const sendChatMessage = useCallback(() => {
    if (!chatMessage.trim()) return;
    
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "Bạn",
        avatar: AVATARS[5],
        message: chatMessage,
        time: new Date(),
        type: "message",
      },
    ]);
    setChatMessage("");
  }, [chatMessage]);

  const leaderBid = bidHistory[0];

  return (
    <div className={`relative min-h-screen ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      {/* Terms Overlay */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FaGavel className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Quy tắc Phòng Đấu giá
                    </h2>
                    <p className="text-sm text-white/80">
                      Vui lòng đọc kỹ trước khi tham gia
                    </p>
                  </div>
                </div>
              </div>
              <div className="max-h-[50vh] overflow-y-auto px-6 py-4 space-y-4">
                {TERMS_CONTENT.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-sm font-semibold text-blue-600">{section.title}</h3>
                    <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                      {section.items.map((itemText) => (
                        <li key={itemText}>{itemText}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  Tôi đã đọc và đồng ý với quy tắc
                </label>
                <button
                  disabled={!acceptedTerms}
                  onClick={() => setShowTerms(false)}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:from-blue-600 hover:to-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                >
                  Vào phòng đấu giá
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Bid Effect */}
      <AnimatePresence>
        {showNewBidEffect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-4xl font-bold px-8 py-4 rounded-2xl shadow-2xl">
              🔨 GIÁ MỚI!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Auction Room */}
      <div className="bg-gray-50 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-bold text-red-500 uppercase tracking-wider">LIVE</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-300" />
                <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px] sm:max-w-none">{item.name}</h1>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaEye className="w-4 h-4" />
                  <span>{viewers}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUsers className="w-4 h-4" />
                  <span>{watching}</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  {isFullscreen ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Product & Bidding */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Display */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                <div className="relative aspect-video">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                  
                  {/* Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Countdown Timer */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <motion.div
                      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md ${
                        isUrgent 
                          ? "bg-red-500 text-white" 
                          : "bg-white/90 text-gray-900"
                      }`}
                    >
                      <FaClock className={`w-5 h-5 ${isUrgent ? "animate-pulse" : "text-blue-600"}`} />
                      <div className="flex gap-2 text-lg font-bold font-mono">
                        {timeParts.days > 0 && (
                          <span>{String(timeParts.days).padStart(2, "0")}d</span>
                        )}
                        <span>{String(timeParts.hours).padStart(2, "0")}h</span>
                        <span>{String(timeParts.minutes).padStart(2, "0")}m</span>
                        <span className={isUrgent ? "text-yellow-300" : "text-blue-600"}>
                          {String(timeParts.seconds).padStart(2, "0")}s
                        </span>
                      </div>
                    </motion.div>
                    
                    <button
                      onClick={() => setShowInfo(!showInfo)}
                      className="p-3 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 transition-colors"
                    >
                      <FaInfoCircle className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Current Price Display */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-200 mb-1">Giá hiện tại</p>
                        <motion.p
                          key={currentPrice}
                          initial={{ scale: 1.2, color: "#60a5fa" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          className="text-4xl sm:text-5xl font-bold text-white"
                        >
                          {formatCurrency(currentPrice)}
                        </motion.p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-yellow-400 mb-1">
                          <FaTrophy className="w-4 h-4" />
                          <span className="text-sm font-medium">Người dẫn đầu</span>
                        </div>
                        <p className="text-lg font-bold text-white">{leaderBid?.bidder || "—"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hot Badge */}
                  {bidCount > 15 && (
                    <div className="absolute top-4 right-20">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-bold text-white">
                        <FaFire className="w-4 h-4" />
                        HOT
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product Info Drawer */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-gray-200"
                    >
                      <div className="p-4 space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{item.category}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            Giá khởi điểm: {formatCurrency(item.startingPrice)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bidding Panel */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <FaGavel className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Đặt giá của bạn</h3>
                      <p className="text-sm text-gray-500">
                        Bước giá tối thiểu: {formatCurrency(minStep)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tối thiểu</p>
                    <p className="font-bold text-blue-600">{formatCurrency(currentPrice + minStep)}</p>
                  </div>
                </div>

                {/* Quick Bid Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {quickBids.map((delta) => (
                    <button
                      key={delta}
                      onClick={() => setBidAmount(currentPrice + delta)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        bidAmount === currentPrice + delta
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      +{formatCurrency(delta)}
                    </button>
                  ))}
                </div>

                {/* Custom Bid Input */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      type="number"
                      value={bidAmount}
                      min={currentPrice + minStep}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={placeBid}
                    disabled={bidAmount < currentPrice + minStep}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-bold text-lg text-white flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25"
                  >
                    <FaBolt className="w-5 h-5" />
                    ĐẤU GIÁ
                  </button>
                </div>

                {/* Message */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 px-4 py-3 rounded-xl flex items-center gap-3 ${
                        message.includes("thành công")
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {message.includes("thành công") ? (
                        <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
                      )}
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Anonymous Toggle */}
                <div className="mt-4 flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FaUserSecret className={`w-5 h-5 ${isAnonymous ? "text-purple-600" : "text-gray-400"}`} />
                    <div>
                      <p className="font-medium text-gray-900">Đấu giá ẩn danh</p>
                      <p className="text-xs text-gray-500">Ẩn danh tính của bạn với người khác</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      isAnonymous ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isAnonymous ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Watch Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setIsWatching(!isWatching)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
                      isWatching
                        ? "bg-pink-100 text-pink-600 border border-pink-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <FaHeart className={`w-4 h-4 ${isWatching ? "fill-current" : ""}`} />
                    {isWatching ? "Đang theo dõi" : "Theo dõi phiên đấu giá"}
                  </button>
                </div>
              </div>

              {/* Bid History */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <FaGavel className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Lịch sử đấu giá</h3>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {bidCount} lượt
                  </span>
                </div>
                <div ref={bidHistoryRef} className="space-y-2 max-h-64 overflow-y-auto">
                  {bidHistory.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        index === 0
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                          : "bg-gray-50"
                      } ${bid.isYou ? "ring-2 ring-blue-500" : ""} ${bid.isAnonymous ? "ring-2 ring-purple-400" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        {index === 0 && <FaCrown className="w-5 h-5 text-yellow-500" />}
                        {bid.isAnonymous ? (
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaUserSecret className="w-5 h-5 text-purple-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <Image
                              src={bid.avatar}
                              alt={bid.bidder}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className={`font-medium ${bid.isAnonymous ? "text-purple-600" : bid.isYou ? "text-blue-600" : "text-gray-900"}`}>
                            {bid.bidder}
                            {bid.isYou && !bid.isAnonymous && <span className="ml-2 text-xs">(Bạn)</span>}
                            {bid.isYou && bid.isAnonymous && <span className="ml-2 text-xs text-purple-500">(Bạn - Ẩn danh)</span>}
                          </p>
                          <p className="text-xs text-gray-500">
                            {bid.time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                      <p className={`text-lg font-bold ${index === 0 ? "text-blue-600" : "text-gray-900"}`}>
                        {formatCurrency(bid.amount)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Chat & Participants */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{bidCount}</p>
                  <p className="text-sm text-gray-500">Lượt đấu giá</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{participants.filter(p => p.isOnline).length}</p>
                  <p className="text-sm text-gray-500">Đang tham gia</p>
                </div>
              </div>

              {/* Participants */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaUsers className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Người tham gia</h3>
                  </div>
                  <span className="text-sm text-gray-500">{participants.length} người</span>
                </div>
                <div className="space-y-2">
                  {participants.slice(0, 5).map((p, index) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image src={p.avatar} alt={p.name} width={32} height={32} className="w-full h-full" />
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${p.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.bidCount} lượt đấu</p>
                      </div>
                      {index === 0 && <FaCrown className="w-4 h-4 text-yellow-500" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[400px]">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaComments className="w-4 h-4 text-green-600" />
                    <h3 className="font-bold text-gray-900">Chat trực tiếp</h3>
                  </div>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
                
                {/* Messages */}
                <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`${msg.type === "system" || msg.type === "bid" ? "text-center" : ""}`}>
                      {msg.type === "system" ? (
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {msg.message}
                        </span>
                      ) : msg.type === "bid" ? (
                        <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {msg.message}
                        </span>
                      ) : (
                        <div className="flex items-start gap-2">
                          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={msg.avatar} alt={msg.user} width={28} height={28} className="w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500">
                              <span className="font-medium text-gray-700">{msg.user}</span>
                              <span className="ml-2">{msg.time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
                            </p>
                            <p className="text-sm text-gray-900 break-words">{msg.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatMessage.trim()}
                      className="px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-colors"
                    >
                      <FaPaperPlane className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-700 mb-1">Cam kết bảo đảm</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Sản phẩm xác thực 100%</li>
                      <li>✓ Thanh toán an toàn</li>
                      <li>✓ Hỗ trợ 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
