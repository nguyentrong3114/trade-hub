"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuctionItem {
    id: number;
    name: string;
    endTime: string;
    title: string;
    description: string;
    currentPrice: number;
    startingPrice: number;
    bids: number;
    imageUrl?: string;
}

const AUCTIONS: AuctionItem[] = [
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
        imageUrl: "/img/auction/1.jpg",
    },
];

export default function AuctionSection() {
    const [activeId, setActiveId] = useState<number>(AUCTIONS[0].id);

    const activeAuction = AUCTIONS.find((a) => a.id === activeId) ?? AUCTIONS[0];

    return (
        <section className="relative py-20">
            {/* Soft gradient background + card container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/70 via-white/60 to-purple-50/80 shadow-[0_40px_80px_rgba(15,23,42,0.12)] ring-1 ring-white/60">
                    {/* Inner gradient glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_55%)]" />

                    <div className="relative grid gap-10 px-8 py-10 md:px-10 lg:px-14 lg:py-14 lg:grid-cols-2">
                        {/* Left side – badge, heading, list */}
                        <div className="flex flex-col">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm backdrop-blur">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px] text-white shadow-sm">
                                    ★
                                </span>
                                <span className="tracking-wide uppercase">Đấu giá</span>
                            </div>

                            {/* Heading */}
                            <div className="mt-6 space-y-4">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                                    Sản phẩm đấu giá gần đây
                                </h2>
                                <p className="max-w-xl text-sm sm:text-base text-slate-500">
                                    Khám phá các sản phẩm đấu giá độc đáo và giá trị. Từ đồng hồ cao cấp đến tác phẩm nghệ thuật,
                                    tham gia đấu giá để sở hữu những món đồ đặc biệt với mức giá tốt nhất.
                                </p>
                            </div>

                            {/* Auction list */}
                            <div className="mt-10 space-y-3">
                                {AUCTIONS.map((auction) => {
                                    const isActive = auction.id === activeId;
                                    return (
                                        <button
                                            key={auction.id}
                                            type="button"
                                            onClick={() => setActiveId(auction.id)}
                                            className={[
                                                "flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all duration-200",
                                                "border",
                                                isActive
                                                    ? "border-transparent bg-white text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
                                                    : "border-white/60 bg-white/10 text-slate-500 hover:bg-white/40 hover:text-slate-800",
                                            ].join(" ")}
                                        >
                                            <Link href={`/auction/${auction.id}`} className="text-sm sm:text-base font-medium hover:underline ">
                                                {auction.name}
                                            </Link>
                                            <span className="text-xs sm:text-sm font-semibold text-slate-400">
                                                Còn {auction.endTime}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right side – image card with overlay */}
                        <div className="flex items-stretch">
                            <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900/95 shadow-[0_30px_70px_rgba(15,23,42,0.8)]">
                                {/* Product Image */}
                                <div className="relative h-64 sm:h-72 lg:h-[320px] w-full">
                                    {activeAuction.imageUrl ? (
                                        <Image
                                            src={activeAuction.imageUrl}
                                            alt={activeAuction.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                            priority={activeAuction.id === AUCTIONS[0].id}
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                            <span className="text-slate-400 text-sm">No image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/95 via-slate-950/90 to-transparent">
                                    <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8">
                                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                                            {activeAuction.title}
                                        </h3>
                                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                            {activeAuction.description}
                                        </p>
                                        {/* Price and bid info */}
                                        <div className="mt-4 flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-400">Giá hiện tại:</span>
                                                <span className="text-base sm:text-lg font-bold text-white">
                                                    ${activeAuction.currentPrice.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-400">Lượt đấu giá:</span>
                                                <span className="text-sm font-semibold text-slate-200">
                                                    {activeAuction.bids}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


