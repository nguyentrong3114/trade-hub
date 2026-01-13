import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentsSection, { Comment } from "@/components/comment";

// Sample blog posts data - trong thực tế sẽ lấy từ API hoặc database
const BLOG_POSTS = [
  {
    id: 1,
    title: "Hướng dẫn đấu giá trực tuyến cho người mới bắt đầu",
    excerpt:
      "Khám phá cách tham gia đấu giá trực tuyến một cách hiệu quả. Từ việc đăng ký tài khoản đến các chiến lược đặt giá thầu thông minh.",
    content: `
      <p>Đấu giá trực tuyến đã trở thành một phương thức mua sắm phổ biến trong thời đại số. Với sự phát triển của công nghệ, việc tham gia đấu giá không còn giới hạn ở các buổi đấu giá truyền thống nữa.</p>
      
      <h2>Bước 1: Đăng ký tài khoản</h2>
      <p>Để bắt đầu, bạn cần tạo một tài khoản trên nền tảng đấu giá. Quá trình này thường đơn giản và chỉ mất vài phút. Bạn sẽ cần cung cấp thông tin cá nhân cơ bản và xác minh email.</p>
      
      <h2>Bước 2: Tìm hiểu về sản phẩm</h2>
      <p>Trước khi đặt giá thầu, hãy dành thời gian nghiên cứu kỹ về sản phẩm. Đọc mô tả chi tiết, xem ảnh từ nhiều góc độ, và kiểm tra lịch sử đấu giá của sản phẩm tương tự.</p>
      
      <h2>Bước 3: Đặt ngân sách</h2>
      <p>Quan trọng nhất là đặt ra một ngân sách tối đa và tuân thủ nghiêm ngặt. Đừng để cảm xúc chi phối khi đấu giá, hãy giữ bình tĩnh và đưa ra quyết định hợp lý.</p>
      
      <h2>Bước 4: Chiến lược đặt giá</h2>
      <p>Có nhiều chiến lược đặt giá khác nhau. Bạn có thể đặt giá cao ngay từ đầu để răn đe đối thủ, hoặc chờ đến phút cuối mới đặt giá để tăng yếu tố bất ngờ.</p>
      
      <p>Nhớ rằng, đấu giá là một nghệ thuật cần sự kiên nhẫn và kinh nghiệm. Hãy bắt đầu với những sản phẩm giá trị thấp để tích lũy kinh nghiệm trước khi tham gia các phiên đấu giá lớn.</p>
    `,
    author: "Nguyễn Văn A",
    authorAvatar: "/img/logo/1.png",
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
    content: `
      <p>Tháng này đã chứng kiến nhiều sản phẩm đấu giá đặc biệt thu hút sự chú ý của cộng đồng. Dưới đây là danh sách top 10 sản phẩm hot nhất.</p>
      
      <h2>1. Đồng hồ Rolex Submariner 2024</h2>
      <p>Chiếc đồng hồ này đã thu hút hơn 50 lượt đấu giá chỉ trong vài giờ đầu tiên. Với giá khởi điểm $12,500, sản phẩm đã đạt mức giá $15,200.</p>
      
      <h2>2. Tranh sơn dầu châu Âu thế kỷ 19</h2>
      <p>Tác phẩm nghệ thuật cổ điển này là một trong những món đồ được săn đón nhất. Giá cuối cùng đạt $8,900.</p>
      
      <p>Các sản phẩm khác trong top 10 bao gồm xe cổ điển, đồ cổ, và các tác phẩm nghệ thuật hiện đại. Mỗi sản phẩm đều có giá trị và câu chuyện riêng của nó.</p>
    `,
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
    content: `
      <p>Đấu giá thành công không chỉ dựa vào may mắn, mà còn cần có chiến lược và kinh nghiệm. Dưới đây là những bí quyết từ các chuyên gia.</p>
      
      <h2>Nghiên cứu kỹ trước khi đấu giá</h2>
      <p>Luôn dành thời gian nghiên cứu về sản phẩm, giá thị trường, và lịch sử đấu giá. Thông tin là vũ khí mạnh nhất của bạn.</p>
      
      <h2>Đặt ngân sách và tuân thủ</h2>
      <p>Đừng bao giờ vượt quá ngân sách đã đặt ra. Cảm xúc có thể khiến bạn đưa ra quyết định sai lầm.</p>
      
      <h2>Timing là chìa khóa</h2>
      <p>Biết khi nào nên đặt giá và khi nào nên chờ đợi. Đôi khi việc đặt giá vào phút cuối có thể mang lại kết quả tốt.</p>
    `,
    author: "Lê Văn C",
    date: "10 Tháng 1, 2024",
    category: "Kinh nghiệm",
    imageUrl: "/img/auction/car.jpg",
    readTime: "6 phút đọc",
    commentsCount: 15,
  },
];

// Sample comments data
const COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Nguyễn Văn X",
    content: "Bài viết rất hữu ích! Tôi đã áp dụng và có kết quả tốt. Cảm ơn tác giả!",
    date: "2 ngày trước",
    likes: 5,
    replies: [
      {
        id: 2,
        author: "Tác giả",
        content: "Cảm ơn bạn đã phản hồi tích cực! Chúc bạn đấu giá thành công!",
        date: "1 ngày trước",
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    author: "Trần Thị Y",
    content: "Tôi mới bắt đầu đấu giá, bài viết này giúp tôi hiểu rõ hơn về quy trình. Có thể chia sẻ thêm về cách xác thực sản phẩm không?",
    date: "3 ngày trước",
    likes: 3,
  },
  {
    id: 4,
    author: "Lê Văn Z",
    content: "Rất hay! Đặc biệt là phần về chiến lược đặt giá. Tôi sẽ thử áp dụng trong phiên đấu giá tiếp theo.",
    date: "4 ngày trước",
    likes: 7,
  },
];

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const t = await getTranslations("blog");
  const postId = parseInt(id);

  const post = BLOG_POSTS.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== postId).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">{t("backToBlog")}</span>
        </Link>

        {/* Header Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/90">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12 mb-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                {post.authorAvatar ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {post.author}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("authorBio")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
            <CommentsSection comments={COMMENTS} />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("relatedPosts")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/${locale}/blog/${relatedPost.id}`}
                    className="group"
                  >
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {relatedPost.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

