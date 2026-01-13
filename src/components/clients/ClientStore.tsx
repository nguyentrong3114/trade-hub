"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaEye, FaStar, FaTag, FaArrowRight } from "react-icons/fa";
import type { Product } from "./types";

interface StoreProduct extends Product {
  id: number;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

interface Props {
  products: Product[];
  clientName: string;
  clientId: number;
  locale: string;
}

export default function ClientStore({ products, clientName, clientId, locale }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (products.length === 0) return null;

  // Enhance products with store data (deterministic values based on index)
  const storeProducts: StoreProduct[] = products.map((product, idx) => ({
    ...product,
    id: idx + 1,
    price: ((idx * 123 + 100) % 900 + 100) * 1000,
    originalPrice: ((idx * 157 + 200) % 1000 + 200) * 1000,
    rating: 4 + (idx % 10) / 10,
    reviews: (idx * 47 + 10) % 500 + 10,
    inStock: idx % 5 !== 0,
  }));

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts =
    selectedCategory === "all"
      ? storeProducts
      : storeProducts.filter((p) => p.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Store Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Cửa hàng</span>
            </div>
            <h2 className="text-2xl font-bold">{clientName} Store</h2>
            <p className="text-sm text-white/80 mt-1">
              Khám phá các sản phẩm & giải pháp chính hãng
            </p>
          </div>
          <Link
            href={`/${locale}/clients/${clientId}/store`}
            className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
          >
            <FaTag className="w-4 h-4" />
            <span className="text-sm font-medium">{products.length} sản phẩm</span>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-white text-indigo-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat === "all" ? "Tất cả" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.name}
              href={`/${locale}/clients/${clientId}/store/${product.id}`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-3xl font-bold text-gray-300">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {product.originalPrice && product.price && product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                    <FaEye className="w-4 h-4" />
                    Xem chi tiết
                  </span>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-red-500 px-3 py-1 rounded">
                      Hết hàng
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                {/* Category */}
                <span className="text-[10px] text-indigo-600 font-medium uppercase tracking-wide">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-base font-bold text-indigo-600">
                    {formatPrice(product.price || 0)}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.price || 0) && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* View Detail Text */}
                <div className="mt-2 flex items-center gap-1 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Xem chi tiết</span>
                  <FaArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <Link 
            href={`/${locale}/clients/${clientId}/store`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Xem tất cả sản phẩm
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
