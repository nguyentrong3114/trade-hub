import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import type { Product } from "./types";

interface Props {
  products: Product[];
  clientId: number;
  locale: string;
}

export default function ClientProducts({ products, clientId, locale }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FaCheckCircle className="w-5 h-5 text-blue-600" />
          Sản phẩm & Dịch vụ
        </h2>
        <Link
          href={`/${locale}/clients/${clientId}/store`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          Xem tất cả
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((product, idx) => (
          <Link
            key={product.name}
            href={`/${locale}/clients/${clientId}/store/${idx + 1}`}
            className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
          >
            {product.image && (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <span className="shrink-0 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {product.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {product.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Xem chi tiết
                <FaArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
