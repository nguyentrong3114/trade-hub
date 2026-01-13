"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaArrowLeft,
  FaCalendar,
  FaEye,
  FaHeart,
  FaComment,
  FaTag,
  FaSearch,
  FaFire,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { CLIENT_DETAILS, BASIC_CLIENTS, DEFAULT_CLIENT, ClientDetail } from "@/components/clients";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  readTime: number;
  featured?: boolean;
}

// Extended mock data for full blog page
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Xu hướng công nghệ mới trong năm 2024",
    excerpt: "Khám phá những xu hướng công nghệ đang thay đổi cách chúng ta làm việc và sinh hoạt trong năm nay. Từ AI đến blockchain, tất cả đều có tiềm năng lớn.",
    thumbnail: "/img/section1.jpg",
    category: "Công nghệ",
    author: "Nguyễn Văn A",
    date: "2024-01-20",
    views: 1250,
    likes: 89,
    comments: 23,
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng sản phẩm hiệu quả nhất",
    excerpt: "Tổng hợp các mẹo và thủ thuật giúp bạn sử dụng sản phẩm của chúng tôi một cách tối ưu và hiệu quả nhất.",
    thumbnail: "/img/section2.jpg",
    category: "Hướng dẫn",
    author: "Trần Thị B",
    date: "2024-01-18",
    views: 856,
    likes: 45,
    comments: 12,
    readTime: 5,
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
    readTime: 6,
    featured: true,
  },
  {
    id: 4,
    title: "Sự kiện ra mắt sản phẩm mới tháng 2",
    excerpt: "Thông tin chi tiết về sự kiện ra mắt dòng sản phẩm mới sắp diễn ra tại Hà Nội.",
    thumbnail: "/img/section4.jpg",
    category: "Sự kiện",
    author: "Phạm Thị D",
    date: "2024-01-12",
    views: 432,
    likes: 34,
    comments: 8,
    readTime: 4,
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
    readTime: 7,
  },
  {
    id: 6,
    title: "5 bí quyết tăng năng suất làm việc",
    excerpt: "Những phương pháp đã được chứng minh giúp tăng hiệu quả công việc đáng kể cho mọi người.",
    thumbnail: "/img/section1.jpg",
    category: "Kiến thức",
    author: "Nguyễn Văn A",
    date: "2024-01-08",
    views: 1456,
    likes: 123,
    comments: 45,
    readTime: 10,
    featured: true,
  },
  {
    id: 7,
    title: "Tương lai của trí tuệ nhân tạo trong doanh nghiệp",
    excerpt: "AI đang thay đổi cách các doanh nghiệp vận hành như thế nào? Cùng tìm hiểu trong bài viết này.",
    thumbnail: "/img/section2.jpg",
    category: "Công nghệ",
    author: "Trần Thị B",
    date: "2024-01-05",
    views: 2341,
    likes: 187,
    comments: 56,
    readTime: 12,
  },
  {
    id: 8,
    title: "Hội thảo chuyên đề về chuyển đổi số",
    excerpt: "Tổng kết những điểm nổi bật từ hội thảo chuyển đổi số vừa diễn ra tại TP.HCM.",
    thumbnail: "/img/section3.jpg",
    category: "Sự kiện",
    author: "Lê Văn C",
    date: "2024-01-03",
    views: 567,
    likes: 43,
    comments: 11,
    readTime: 5,
  },
  {
    id: 9,
    title: "Bảo mật thông tin trong thời đại số",
    excerpt: "Những điều cần biết để bảo vệ dữ liệu cá nhân và doanh nghiệp trong môi trường số.",
    thumbnail: "/img/section4.jpg",
    category: "Kiến thức",
    author: "Phạm Thị D",
    date: "2024-01-01",
    views: 892,
    likes: 78,
    comments: 22,
    readTime: 8,
  },
  {
    id: 10,
    title: "Phỏng vấn CEO: Tầm nhìn chiến lược 2024",
    excerpt: "Cuộc trò chuyện độc quyền với CEO về định hướng phát triển trong năm mới.",
    thumbnail: "/img/section5.jpg",
    category: "Tin tức",
    author: "Hoàng Văn E",
    date: "2023-12-28",
    views: 1678,
    likes: 145,
    comments: 38,
    readTime: 15,
    featured: true,
  },
  {
    id: 11,
    title: "Tối ưu hóa quy trình làm việc với công nghệ",
    excerpt: "Các công cụ và phương pháp giúp tự động hóa công việc hàng ngày một cách hiệu quả.",
    thumbnail: "/img/section1.jpg",
    category: "Hướng dẫn",
    author: "Nguyễn Văn A",
    date: "2023-12-25",
    views: 734,
    likes: 52,
    comments: 14,
    readTime: 6,
  },
  {
    id: 12,
    title: "Đối tác chiến lược mới năm 2024",
    excerpt: "Thông báo về việc hợp tác với các đối tác quan trọng trong năm mới.",
    thumbnail: "/img/section2.jpg",
    category: "Tin tức",
    author: "Trần Thị B",
    date: "2023-12-20",
    views: 456,
    likes: 34,
    comments: 9,
    readTime: 4,
  },
];

const categories = ["Tất cả", "Công nghệ", "Hướng dẫn", "Khách hàng", "Sự kiện", "Tin tức", "Kiến thức"];

export default function ClientBlogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const clientId = parseInt(params.id as string, 10);
  const t = useTranslations("clientBlog");

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");

  // Get client info
  let client: ClientDetail | null = CLIENT_DETAILS.find((c) => c.id === clientId) || null;
  if (!client) {
    const basicClient = BASIC_CLIENTS.find((c) => c.id === clientId);
    if (basicClient) {
      client = { ...basicClient, ...DEFAULT_CLIENT };
    }
  }

  // Filter and sort posts
  let filteredPosts = allBlogPosts;

  if (selectedCategory !== "Tất cả") {
    filteredPosts = filteredPosts.filter((post) => post.category === selectedCategory);
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort posts
  if (sortBy === "popular") {
    filteredPosts = [...filteredPosts].sort((a, b) => b.views - a.views);
  } else if (sortBy === "trending") {
    filteredPosts = [...filteredPosts].sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
  } else {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  const featuredPosts = allBlogPosts.filter((post) => post.featured).slice(0, 3);

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Không tìm thấy đối tác</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href={`/${locale}/clients/${clientId}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Quay lại {client.name}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog & Tin tức</h1>
              <p className="text-white/80 text-lg">
                Cập nhật tin tức và bài viết mới nhất từ {client.name}
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-md w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-white/90">
            <div className="flex items-center gap-2">
              <FaTag className="w-5 h-5" />
              <span>{allBlogPosts.length} bài viết</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="w-5 h-5" />
              <span>{allBlogPosts.reduce((sum, p) => sum + p.views, 0).toLocaleString()} lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="w-5 h-5" />
              <span>{allBlogPosts.reduce((sum, p) => sum + p.likes, 0).toLocaleString()} lượt thích</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
          {/* Main Content */}
          <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortBy("latest")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                    sortBy === "latest" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <FaClock className="w-4 h-4" />
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortBy("popular")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                    sortBy === "popular" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <FaEye className="w-4 h-4" />
                  Phổ biến
                </button>
                <button
                  onClick={() => setSortBy("trending")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                    sortBy === "trending" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <FaFire className="w-4 h-4" />
                  Trending
                </button>
              </div>
            </div>

            {/* Results count */}
            <p className="text-gray-500 mb-6">
              Hiển thị <strong>{filteredPosts.length}</strong> bài viết
              {selectedCategory !== "Tất cả" && ` trong "${selectedCategory}"`}
              {searchQuery && ` cho "${searchQuery}"`}
            </p>

            {/* Blog Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Featured Badge */}
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                          <FaStar className="w-3 h-3" />
                          Nổi bật
                        </span>
                      </div>
                    )}

                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        <FaTag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white text-sm">
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">{post.author}</p>
                          <p className="text-xs">{post.readTime} phút đọc</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaCalendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length >= 12 && (
              <div className="text-center mt-10">
                <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                  Xem thêm bài viết
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Featured Posts */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaStar className="w-5 h-5 text-yellow-500" />
                Bài viết nổi bật
              </h3>
              <div className="space-y-4">
                {featuredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
              <div className="space-y-2">
                {categories.slice(1).map((category) => {
                  const count = allBlogPosts.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags phổ biến</h3>
              <div className="flex flex-wrap gap-2">
                {["AI", "Công nghệ", "Startup", "Marketing", "Design", "SEO", "Mobile", "Cloud", "Security", "Data"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-600 text-sm rounded-full cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Đăng ký nhận tin</h3>
              <p className="text-white/80 text-sm mb-4">
                Nhận thông báo khi có bài viết mới
              </p>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-3"
              />
              <button className="w-full py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-white/90 transition-colors">
                Đăng ký
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
