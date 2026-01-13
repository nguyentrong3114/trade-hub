"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaMinus,
  FaPlus,
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
  fullDescription: string;
  category: string;
  image?: string;
  images: string[];
  price: number;
  originalPrice?: number;
  colors: { name: string; value: string }[];
  sizes: string[];
  materials: string;
  sizeGuide: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const clientId = parseInt(params.id as string, 10);
  const productId = parseInt(params.productId as string, 10);

  // States
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "materials" | "size">("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

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

  // Generate product data
  const getProduct = (): StoreProduct | null => {
    if (!client || !client.products[productId - 1]) return null;
    const baseProduct = client.products[productId - 1];
    const priceBase = [250000, 450000, 350000, 550000, 650000, 750000];
    const idx = productId - 1;

    return {
      id: productId,
      name: baseProduct.name,
      description: baseProduct.description,
      fullDescription: `Nâng tầm trải nghiệm của bạn với ${baseProduct.name}, được thiết kế với công nghệ tiên tiến nhất để mang đến hiệu suất tối ưu và sự tiện lợi vượt trội. Sản phẩm được phát triển bởi đội ngũ chuyên gia hàng đầu, đảm bảo chất lượng và độ tin cậy cao nhất.

Với giao diện thân thiện và khả năng tùy biến linh hoạt, sản phẩm có thể được điều chỉnh để phù hợp với nhu cầu đa dạng của doanh nghiệp, từ quy mô nhỏ đến các tập đoàn lớn.`,
      category: baseProduct.category,
      image: baseProduct.image,
      images: [
        baseProduct.image || "/img/section1.jpg",
        "/img/auction/1.jpg",
        "/img/auction/2.webp",
        "/img/auction/car.jpg",
      ],
      price: priceBase[idx % priceBase.length] + (idx * 50000),
      originalPrice: idx % 2 === 0
        ? priceBase[idx % priceBase.length] + (idx * 80000) + 200000
        : undefined,
      colors: [
        { name: "Standard", value: "#374151" },
        { name: "Premium", value: "#1e40af" },
        { name: "Enterprise", value: "#7c3aed" },
      ],
      sizes: ["Basic", "Pro", "Enterprise"],
      materials: `Sản phẩm được xây dựng trên nền tảng công nghệ hiện đại, đảm bảo hiệu suất ổn định và khả năng mở rộng linh hoạt.

• Kiến trúc microservices
• Bảo mật theo tiêu chuẩn ISO 27001
• Hỗ trợ tích hợp API RESTful
• Database tối ưu cho big data
• Cloud-native architecture`,
      sizeGuide: `Hướng dẫn chọn gói phù hợp:

Basic: Phù hợp với doanh nghiệp nhỏ, dưới 50 người dùng
• Tính năng cơ bản
• Hỗ trợ email
• 10GB lưu trữ

Pro: Phù hợp với doanh nghiệp vừa, 50-200 người dùng
• Đầy đủ tính năng
• Hỗ trợ 24/7
• 100GB lưu trữ

Enterprise: Phù hợp với doanh nghiệp lớn, không giới hạn người dùng
• Tính năng nâng cao
• Dedicated support
• Unlimited storage`,
    };
  };

  const product = getProduct();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!client || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link
            href={`/${locale}/clients/${clientId}/store`}
            className="text-gray-600 hover:underline"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/5] relative">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-gray-900"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="bg-gray-100 rounded-lg p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="text-sm mb-4">
              <Link
                href={`/${locale}/clients/${clientId}/store`}
                className="text-gray-500 hover:text-gray-900"
              >
                Store
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-500">{product.category}</span>
            </div>

            {/* Title & Wishlist */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                {isWishlisted ? (
                  <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <FaRegHeart className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Price */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xl text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Selector */}
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-900 mb-3">Phiên bản</p>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      selectedColor === idx
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-3">Gói dịch vụ</p>
              <div className="flex gap-2">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(idx)}
                    className={`w-24 py-2 rounded text-sm font-medium border transition-all ${
                      selectedSize === idx
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex gap-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === "description"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Mô tả
                </button>
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === "materials"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Thông số
                </button>
                <button
                  onClick={() => setActiveTab("size")}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === "size"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Hướng dẫn
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {activeTab === "description" && product.fullDescription}
                {activeTab === "materials" && product.materials}
                {activeTab === "size" && product.sizeGuide}
              </div>
            </div>

            {/* Quantity & Add to Bag */}
            <div className="mt-8 flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Bag */}
              <button className="flex-1 py-3 px-6 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {client.products
              .filter((_, idx) => idx !== productId - 1)
              .slice(0, 4)
              .map((p, idx) => {
                const actualId = idx + 1 + (idx >= productId - 1 ? 1 : 0);
                return (
                  <Link
                    key={actualId}
                    href={`/${locale}/clients/${clientId}/store/${actualId}`}
                    className="group"
                  >
                    <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square relative">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                          {p.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 uppercase">
                        {p.category}
                      </p>
                      <h3 className="text-sm font-medium text-gray-900 mt-1 group-hover:text-gray-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatPrice(350000 + idx * 100000)}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
