import BlogSection, { BlogPost } from "@/components/blog";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  // Sample blog posts - có thể lấy từ API hoặc database
  const blogPosts: BlogPost[] = [
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
    {
      id: 5,
      title: "Cách xác thực sản phẩm trước khi đấu giá",
      excerpt:
        "Hướng dẫn chi tiết về cách kiểm tra và xác thực sản phẩm để đảm bảo bạn mua được hàng chính hãng.",
      content: "Full content here...",
      author: "Hoàng Văn E",
      date: "5 Tháng 1, 2024",
      category: "Hướng dẫn",
      imageUrl: "/img/auction/1.jpg",
      readTime: "4 phút đọc",
      commentsCount: 20,
    },
    {
      id: 6,
      title: "Những lưu ý quan trọng khi tham gia đấu giá",
      excerpt:
        "Tổng hợp những điều cần lưu ý để tránh các rủi ro và có trải nghiệm đấu giá tốt nhất.",
      content: "Full content here...",
      author: "Vũ Thị F",
      date: "3 Tháng 1, 2024",
      category: "Kinh nghiệm",
      imageUrl: "/img/auction/2.webp",
      readTime: "5 phút đọc",
      commentsCount: 9,
    },
  ];

  return (
    <div className="min-h-screen">
      <BlogSection posts={blogPosts} locale={locale} />
    </div>
  );
}

