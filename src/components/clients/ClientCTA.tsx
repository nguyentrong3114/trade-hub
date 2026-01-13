import Link from "next/link";

interface Props {
  locale: string;
}

export default function ClientCTA({ locale }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
      <h2 className="text-lg font-bold mb-2">
        Hợp tác cùng TradeHub
      </h2>
      <p className="text-sm text-blue-100 mb-4 leading-relaxed">
        TradeHub kết nối các đối tác chiến lược để xây dựng hệ sinh thái
        giao dịch an toàn, minh bạch và hiệu quả.
      </p>
      <Link
        href={`/${locale}/contact`}
        className="inline-flex items-center justify-center w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-blue-600 shadow hover:bg-gray-100 transition-colors"
      >
        Liên hệ ngay
      </Link>
    </div>
  );
}

