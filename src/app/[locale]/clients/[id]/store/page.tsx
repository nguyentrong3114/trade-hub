"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaEye,
  FaStar,
  FaSearch,
  FaFilter,
  FaTh,
  FaList,
  FaHeart,
  FaRegHeart,
  FaTimes,
} from "react-icons/fa";
import {
  CLIENT_DETAILS,
  DEFAULT_CLIENT,
  BASIC_CLIENTS,
  ClientDetail,
} from "@/components/clients";

interface StoreProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export default function ClientStorePage() {
  const params = useParams();
  const locale = params.locale as string;
  const clientId = parseInt(params.id as string, 10);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get client data
  let client: ClientDetail | null =
    CLIENT_DETAILS.find((c) => c.id === clientId) || null;

  if (!client) {
    const basicClient = BASIC_CLIENTS.find((c) => c.id === clientId);
    if (basicClient) {
      client = {
        ...basicClient,
        ...DEFAULT_CLIENT,
      };
    }
  }

  // Generate store products from client products (deterministic values based on index)
  const storeProducts: StoreProduct[] = useMemo(() => {
    if (!client) return [];
    return client.products.map((product, idx) => {
      // Use index-based deterministic values instead of random
      const priceBase = [250000, 450000, 350000, 550000, 650000, 750000];
      const ratingBase = [4.5, 4.2, 4.8, 4.0, 4.7, 4.3];
      const reviewsBase = [128, 256, 89, 342, 167, 201];
      
      return {
        id: idx + 1,
        name: product.name,
        description: product.description,
        category: product.category,
        image: product.image,
        price: priceBase[idx % priceBase.length] + (idx * 50000),
        originalPrice: idx % 2 === 0 
          ? priceBase[idx % priceBase.length] + (idx * 80000) + 200000
          : undefined,
        rating: ratingBase[idx % ratingBase.length],
        reviews: reviewsBase[idx % reviewsBase.length] + (idx * 15),
        inStock: idx % 5 !== 0, // Every 5th product is out of stock
        isNew: idx % 3 === 0,
        isBestSeller: idx % 4 === 0,
      };
    });
  }, [client]);

  // Get unique categories
  const categories = useMemo(() => {
    return ["all", ...new Set(storeProducts.map((p) => p.category))];
  }, [storeProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...storeProducts];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [storeProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy đối tác
          </h1>
          <Link href={`/${locale}/clients`} className="text-blue-600 hover:underline">
            Quay lại danh sách đối tác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/${locale}/clients/${clientId}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="text-sm">Quay lại hồ sơ</span>
            </Link>
            <span className="text-white/50">/</span>
            <span className="text-sm text-white/80">Cửa hàng</span>
          </div>

          {/* Store Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm p-2 overflow-hidden">
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
                  {client.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{client.name} Store</h1>
              <p className="text-white/80 mt-1">
                Khám phá {storeProducts.length} sản phẩm & giải pháp chính hãng
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            >
              <FaFilter className="w-4 h-4" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Danh mục
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat === "all" ? "Tất cả" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Khoảng giá
                </h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 10000000]);
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="w-full py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600">
                Hiển thị{" "}
                <span className="font-semibold">{filteredProducts.length}</span>{" "}
                sản phẩm
              </p>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp → Cao</option>
                  <option value="price-desc">Giá: Cao → Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="newest">Mới nhất</option>
                </select>

                {/* View Mode */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <FaTh className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <FaList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "space-y-4"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${locale}/clients/${clientId}/store/${product.id}`}
                      className={`group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      {/* Product Image */}
                      <div
                        className={`relative bg-gray-50 overflow-hidden ${
                          viewMode === "list"
                            ? "w-40 h-40 shrink-0"
                            : "aspect-square"
                        }`}
                      >
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <span className="text-4xl font-bold text-gray-300">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              MỚI
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              BÁN CHẠY
                            </span>
                          )}
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                -
                                {Math.round(
                                  (1 - product.price / product.originalPrice) *
                                    100
                                )}
                                %
                              </span>
                            )}
                        </div>

                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                          {wishlist.includes(product.id) ? (
                            <FaHeart className="w-4 h-4 text-red-500" />
                          ) : (
                            <FaRegHeart className="w-4 h-4" />
                          )}
                        </button>

                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                          >
                            <FaShoppingCart className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Out of Stock */}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-medium bg-red-500 px-4 py-2 rounded">
                              Hết hàng
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <span className="text-[10px] text-indigo-600 font-medium uppercase tracking-wide">
                          {product.category}
                        </span>

                        <h3
                          className={`font-semibold text-gray-900 mt-1 ${
                            viewMode === "list"
                              ? "text-base"
                              : "text-sm line-clamp-2 min-h-[2.5rem]"
                          }`}
                        >
                          {product.name}
                        </h3>

                        {viewMode === "list" && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
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
                        <div className="mt-3 flex items-end gap-2">
                          <span
                            className={`font-bold text-indigo-600 ${
                              viewMode === "list" ? "text-lg" : "text-base"
                            }`}
                          >
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                        </div>

                        {viewMode === "list" && (
                          <button 
                            onClick={(e) => e.preventDefault()}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            <FaShoppingCart className="w-4 h-4" />
                            Thêm vào giỏ
                          </button>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-indigo-600 text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaSearch className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-500 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 10000000]);
                    setSearchQuery("");
                  }}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

