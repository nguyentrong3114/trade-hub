import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "./blog";

// Sample blog posts data - trong thực tế sẽ lấy từ API hoặc database
const HOT_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Hướng dẫn đấu giá trực tuyến cho người mới bắt đầu",
    excerpt:
      "Khám phá cách tham gia đấu giá trực tuyến một cách hiệu quả. Từ việc đăng ký tài khoản đến các chiến lược đặt giá thầu thông minh.",
    content: "Full content here...",
    author: "Nguyễn Văn A",
    date: "15 Tháng 1, 2024",
    category: "Hướng dẫn",
    imageUrl: "/img/auction/1.jpg",
    readTime: "5 phút đọc",
    commentsCount: 12,
  },
  {
    id: 2,
    title: "Top 10 sản phẩm đấu giá hot nhất tháng này",
    excerpt:
      "Tổng hợp những sản phẩm đấu giá được quan tâm nhất trong tháng, từ đồng hồ cao cấp đến tác phẩm nghệ thuật độc đáo.",
    content: "Full content here...",
    author: "Trần Thị B",
    date: "12 Tháng 1, 2024",
    category: "Tin tức",
    imageUrl: "/img/auction/2.webp",
    readTime: "7 phút đọc",
    commentsCount: 8,
  },
  {
    id: 3,
    title: "Bí quyết đấu giá thành công: Những điều cần biết",
    excerpt:
      "Chia sẻ kinh nghiệm và bí quyết từ các chuyên gia đấu giá để giúp bạn có được những món đồ giá trị với mức giá tốt nhất.",
    content: "Full content here...",
    author: "Lê Văn C",
    date: "10 Tháng 1, 2024",
    category: "Kinh nghiệm",
    imageUrl: "/img/auction/car.jpg",
    readTime: "6 phút đọc",
    commentsCount: 15,
  },
  {
    id: 4,
    title: "Lịch sử và xu hướng đấu giá trực tuyến",
    excerpt:
      "Tìm hiểu về lịch sử phát triển của đấu giá trực tuyến và các xu hướng mới nhất trong ngành này.",
    content: "Full content here...",
    author: "Phạm Thị D",
    date: "8 Tháng 1, 2024",
    category: "Phân tích",
    imageUrl: "/img/section1.jpg",
    readTime: "8 phút đọc",
    commentsCount: 6,
  },
];

export default async function HotBlog() {
  const locale = await getLocale();
  const t = await getTranslations("hotblog");
  const posts = HOT_BLOG_POSTS.slice(0, 3); // Lấy 3 bài để match layout: 1 lớn + 2 nhỏ
  const [mainPost, ...sidePosts] = posts;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header + More button */}
      <div className="mb-12 flex items-start justify-between">
        <div>
          <h2 className="text-5xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </div>
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-900 text-base font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
        >
          <span>{t("viewMore")}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Grid layout: 1 large + 2 medium cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main article - spans 1 column */}
        {mainPost && (
          <article className="group overflow-hidden">
            <Link href={`/${locale}/blog/${mainPost.id}`}>
              <div className="relative h-80 w-full overflow-hidden rounded-lg">
                <Image
                  src={mainPost.imageUrl}
                  alt={mainPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Link>
            <div className="pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="uppercase tracking-wider font-medium text-xs">{mainPost.category}</span>
                <span className="text-gray-400">/</span>
                <span>{mainPost.date}</span>
              </div>
              <Link href={`/${locale}/blog/${mainPost.id}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {mainPost.title}
                </h3>
              </Link>
              <p className="text-gray-600 leading-relaxed">
                {mainPost.excerpt}
              </p>
            </div>
          </article>
        )}

        {/* Side articles - each spans 1 column */}
        {sidePosts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden"
          >
            <Link href={`/${locale}/blog/${post.id}`}>
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Link>
            <div className="pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <span className="uppercase tracking-wider font-medium text-xs">{post.category}</span>
                <span className="text-gray-400">/</span>
                <span>{post.date}</span>
              </div>
              <Link href={`/${locale}/blog/${post.id}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}