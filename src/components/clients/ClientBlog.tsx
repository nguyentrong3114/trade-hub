"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaCalendar,
  FaUser,
  FaEye,
  FaHeart,
  FaComment,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
}

interface ClientBlogProps {
  companyName: string;
  locale: string;
  clientId: number;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Xu hướng công nghệ mới trong năm 2024",
    excerpt: "Khám phá những xu hướng công nghệ đang thay đổi cách chúng ta làm việc và sinh hoạt trong năm nay.",
    thumbnail: "/img/section1.jpg",
    category: "Công nghệ",
    author: "Nguyễn Văn A",
    date: "2024-01-20",
    views: 1250,
    likes: 89,
    comments: 23,
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng sản phẩm hiệu quả nhất",
    excerpt: "Tổng hợp các mẹo và thủ thuật giúp bạn sử dụng sản phẩm của chúng tôi một cách tối ưu.",
    thumbnail: "/img/section2.jpg",
    category: "Hướng dẫn",
    author: "Trần Thị B",
    date: "2024-01-18",
    views: 856,
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    title: "Câu chuyện thành công từ khách hàng",
    excerpt: "Chia sẻ từ những khách hàng đã đạt được kết quả xuất sắc khi sử dụng dịch vụ của chúng tôi.",
    thumbnail: "/img/section3.jpg",
    category: "Khách hàng",
    author: "Lê Văn C",
    date: "2024-01-15",
    views: 624,
    likes: 67,
    comments: 18,
  },
  {
    id: 4,
    title: "Sự kiện ra mắt sản phẩm mới tháng 2",
    excerpt: "Thông tin chi tiết về sự kiện ra mắt dòng sản phẩm mới sắp diễn ra.",
    thumbnail: "/img/section4.jpg",
    category: "Sự kiện",
    author: "Phạm Thị D",
    date: "2024-01-12",
    views: 432,
    likes: 34,
    comments: 8,
  },
  {
    id: 5,
    title: "Cập nhật tính năng mới trong phiên bản 2.0",
    excerpt: "Tìm hiểu về những tính năng mới được bổ sung trong bản cập nhật lớn nhất năm nay.",
    thumbnail: "/img/section5.jpg",
    category: "Tin tức",
    author: "Hoàng Văn E",
    date: "2024-01-10",
    views: 978,
    likes: 56,
    comments: 15,
  },
  {
    id: 6,
    title: "5 bí quyết tăng năng suất làm việc",
    excerpt: "Những phương pháp đã được chứng minh giúp tăng hiệu quả công việc đáng kể.",
    thumbnail: "/img/section1.jpg",
    category: "Kiến thức",
    author: "Nguyễn Văn A",
    date: "2024-01-08",
    views: 1456,
    likes: 123,
    comments: 45,
  },
];

const categories = ["Tất cả", "Công nghệ", "Hướng dẫn", "Khách hàng", "Sự kiện", "Tin tức", "Kiến thức"];

export default function ClientBlog({ companyName, locale, clientId }: ClientBlogProps) {
  const t = useTranslations("clientBlog");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const filteredPosts =
    selectedCategory === "Tất cả"
      ? mockBlogPosts
      : mockBlogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
            <p className="text-gray-600 mt-1">{t("subtitle", { company: companyName })}</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredPost === post.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    <FaTag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white/90 text-sm">
                  <span className="flex items-center gap-1">
                    <FaEye className="w-4 h-4" />
                    {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className="w-4 h-4" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className="w-4 h-4" />
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
                      {post.author.charAt(0)}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("vi-VN")}
                  </div>
                </div>

                {/* Read More */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hoveredPost === post.id ? 1 : 0, x: hoveredPost === post.id ? 0 : -10 }}
                  className="mt-4 flex items-center gap-2 text-blue-600 font-medium"
                >
                  {t("readMore")}
                  <FaArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/clients/${clientId}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            {t("viewAll")}
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

