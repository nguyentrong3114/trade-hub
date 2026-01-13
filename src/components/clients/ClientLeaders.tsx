import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaArrowRight } from "react-icons/fa";
import type { Leader } from "./types";

interface Props {
  leaders: Leader[];
  locale?: string;
}

export default function ClientLeaders({ leaders, locale = "en" }: Props) {
  if (leaders.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Section Tag */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gray-900"></div>
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                /Đội ngũ
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Gặp gỡ những
              <br />
              <span className="text-gray-900">Nhà lãnh đạo</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              Đội ngũ lãnh đạo tài năng và giàu kinh nghiệm, cam kết mang đến những giá trị tốt nhất cho khách hàng và đối tác.
            </p>

            {/* About Button */}
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center group"
            >
              <span className="bg-gray-900 text-white px-6 py-3 text-sm font-medium rounded-l-lg">
                Về chúng tôi
              </span>
              <span className="bg-lime-400 p-3 rounded-r-lg group-hover:bg-lime-500 transition-colors">
                <FaArrowRight className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>

          {/* Join Us Box */}
          <div className="mt-8 lg:mt-0 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Tham gia cùng chúng tôi</h3>
            <p className="text-sm text-gray-600 mb-4">
              Chúng tôi luôn tìm kiếm những tài năng để cùng phát triển.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-300 transition-colors"
            >
              Liên hệ
              <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Column - Leaders Grid */}
        <div className="grid grid-cols-2 gap-3">
          {leaders.map((leader, idx) => (
            <div
              key={leader.name}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 max-w-[180px]"
            >
              {/* Number Badge */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-sm"></div>
                <span className="text-[10px] font-medium text-gray-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Leader Image */}
              {leader.avatar ? (
                <Image
                  src={leader.avatar}
                  alt={leader.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
                  <span className="text-4xl font-bold text-gray-400">
                    {leader.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Leader Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <h3 className="font-bold text-white text-sm leading-tight">
                  {leader.name}
                </h3>
                <p className="text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">
                  {leader.position}
                </p>
                
                {/* LinkedIn Icon (optional) */}
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                  >
                    <FaLinkedin className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
