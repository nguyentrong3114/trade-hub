import type { ClientDetail } from "./types";

export const CLIENT_DETAILS: ClientDetail[] = [
  {
    id: 1,
    name: "TechNova Solutions",
    slogan: "Công nghệ dẫn đầu, Giải pháp toàn diện",
    description:
      "Công ty công nghệ chuyên phát triển giải pháp phần mềm cho doanh nghiệp. Đối tác chiến lược của chúng tôi trong lĩnh vực công nghệ thông tin.",
    logo: "/img/logo/1.png",
    coverImage: "/img/auction/1.jpg",
    category: "Công nghệ",
    rank: "Platinum",
    overview:
      "TechNova Solutions là công ty công nghệ hàng đầu Việt Nam, tập trung vào các nền tảng SaaS, hệ thống quản trị doanh nghiệp (ERP, CRM) và các giải pháp tích hợp dữ liệu thời gian thực cho tổ chức vừa và lớn. Với hơn 15 năm kinh nghiệm, chúng tôi đã phục vụ hơn 500 doanh nghiệp trong và ngoài nước.",
    mission:
      "Mang đến những giải pháp công nghệ tiên tiến, giúp doanh nghiệp tối ưu hóa quy trình và nâng cao hiệu quả hoạt động.",
    vision:
      "Trở thành công ty công nghệ hàng đầu Đông Nam Á, dẫn đầu xu hướng chuyển đổi số cho doanh nghiệp.",
    coreValues: [
      "Đổi mới sáng tạo",
      "Chất lượng là trên hết",
      "Khách hàng là trung tâm",
      "Hợp tác và phát triển bền vững",
    ],
    foundedYear: 2009,
    employeeCount: "500+",
    location: "Hà Nội, Việt Nam",
    address: "Tầng 15, Tòa nhà Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội",
    email: "contact@technova.example.com",
    phone: "+84 24 1234 5678",
    website: "https://technova.example.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/technova",
      twitter: "https://twitter.com/technova",
      facebook: "https://facebook.com/technova",
    },
    products: [
      {
        name: "NovaTrade Suite",
        description:
          "Bộ sản phẩm quản lý giao dịch và danh mục đầu tư dành cho công ty chứng khoán và sàn giao dịch. Hỗ trợ giao dịch thời gian thực, quản lý rủi ro và báo cáo tuân thủ.",
        category: "Fintech",
        image: "/img/auction/1.jpg",
      },
      {
        name: "NovaERP Cloud",
        description:
          "Giải pháp ERP trên nền tảng đám mây giúp tối ưu vận hành, kế toán và kho vận. Tích hợp AI để dự báo và tự động hóa quy trình.",
        category: "SaaS",
        image: "/img/auction/2.webp",
      },
      {
        name: "NovaBI Insights",
        description:
          "Hệ thống báo cáo và phân tích dữ liệu trực quan, hỗ trợ ra quyết định theo thời gian thực với dashboard tùy chỉnh.",
        category: "Analytics",
        image: "/img/auction/car.jpg",
      },
      {
        name: "NovaCRM Pro",
        description:
          "Giải pháp quản lý quan hệ khách hàng toàn diện, tích hợp automation marketing và AI chatbot.",
        category: "CRM",
        image: "/img/section1.jpg",
      },
    ],
    leaders: [
      {
        name: "Nguyễn Văn Minh",
        position: "CEO & Founder",
        avatar: "/img/logo/1.png",
        linkedin: "https://linkedin.com/in/nvminh",
      },
      {
        name: "Trần Thị Hương",
        position: "CTO",
        avatar: "/img/logo/2.png",
        linkedin: "https://linkedin.com/in/tthuong",
      },
      {
        name: "Lê Hoàng Nam",
        position: "CFO",
        avatar: "/img/logo/3.png",
        linkedin: "https://linkedin.com/in/lhnam",
      },
      {
        name: "Phạm Thị Lan",
        position: "COO",
        avatar: "/img/logo/4.png",
        linkedin: "https://linkedin.com/in/ptlan",
      },
    ],
    achievements: [
      {
        title: "Top 10 Công ty Công nghệ Việt Nam",
        year: "2024",
        description: "Được vinh danh bởi Vietnam Tech Awards",
      },
      {
        title: "Chứng nhận ISO 27001",
        year: "2023",
        description: "Tiêu chuẩn quốc tế về bảo mật thông tin",
      },
      {
        title: "Đối tác vàng Microsoft",
        year: "2022",
        description: "Microsoft Gold Partner cho giải pháp Cloud",
      },
      {
        title: "Sao Khuê 2021",
        year: "2021",
        description: "Giải thưởng cho sản phẩm NovaERP Cloud",
      },
    ],
    testimonials: [
      {
        author: "Nguyễn Thanh Hải",
        company: "VinGroup",
        content:
          "TechNova đã giúp chúng tôi chuyển đổi số thành công với hệ thống ERP toàn diện. Hiệu quả vận hành tăng 40% sau 6 tháng triển khai.",
        avatar: "/img/logo/5.png",
      },
      {
        author: "Trần Minh Đức",
        company: "FPT Software",
        content:
          "Đội ngũ chuyên nghiệp, hỗ trợ tận tình. NovaTrade Suite là giải pháp tốt nhất cho ngành tài chính mà chúng tôi từng sử dụng.",
        avatar: "/img/logo/6.png",
      },
    ],
    gallery: [
      "/img/auction/1.jpg",
      "/img/auction/2.webp",
      "/img/auction/car.jpg",
      "/img/section1.jpg",
    ],
    certifications: [
      "ISO 27001:2022",
      "ISO 9001:2015",
      "CMMI Level 5",
      "AWS Partner",
      "Google Cloud Partner",
    ],
  },
  {
    id: 2,
    name: "GreenLeaf Trading",
    slogan: "Kết nối thị trường, Phát triển bền vững",
    description:
      "Doanh nghiệp thương mại với hệ thống phân phối toàn quốc. Chuyên về xuất nhập khẩu và phân phối hàng hóa chất lượng cao.",
    logo: "/img/logo/2.png",
    coverImage: "/img/auction/2.webp",
    category: "Thương mại",
    rank: "Gold",
    overview:
      "GreenLeaf Trading vận hành mạng lưới phân phối rộng khắp 63 tỉnh thành, tập trung vào các sản phẩm tiêu dùng nhanh và nông sản xuất khẩu. Chúng tôi kết nối hơn 10,000 nhà cung cấp với hàng triệu người tiêu dùng.",
    mission:
      "Mang sản phẩm chất lượng đến tay người tiêu dùng với giá cả hợp lý nhất.",
    vision:
      "Trở thành nhà phân phối hàng đầu Đông Nam Á về sản phẩm tiêu dùng và nông sản.",
    coreValues: [
      "Chất lượng sản phẩm",
      "Uy tín trong kinh doanh",
      "Phát triển bền vững",
      "Đối tác win-win",
    ],
    foundedYear: 2005,
    employeeCount: "1,200+",
    location: "TP. Hồ Chí Minh, Việt Nam",
    address: "Số 88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    email: "info@greenleaf.example.com",
    phone: "+84 28 9876 5432",
    website: "https://greenleaf.example.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/greenleaf",
      facebook: "https://facebook.com/greenleaf",
    },
    products: [
      {
        name: "GreenFresh Export",
        description:
          "Danh mục nông sản xuất khẩu sang thị trường châu Âu và châu Á. Đạt tiêu chuẩn GlobalGAP và hữu cơ quốc tế.",
        category: "Xuất khẩu",
        image: "/img/auction/2.webp",
      },
      {
        name: "LeafMart Wholesale",
        description:
          "Nền tảng bán buôn trực tuyến cho đại lý và nhà bán lẻ. Hỗ trợ đặt hàng, thanh toán và vận chuyển tự động.",
        category: "B2B Commerce",
        image: "/img/auction/1.jpg",
      },
      {
        name: "GreenLeaf Retail",
        description:
          "Chuỗi cửa hàng bán lẻ thực phẩm sạch và sản phẩm hữu cơ tại các thành phố lớn.",
        category: "Retail",
        image: "/img/auction/car.jpg",
      },
    ],
    leaders: [
      {
        name: "Lê Văn Phúc",
        position: "CEO",
        avatar: "/img/logo/2.png",
        linkedin: "https://linkedin.com/in/lvphuc",
      },
      {
        name: "Nguyễn Thị Mai",
        position: "Giám đốc Kinh doanh",
        avatar: "/img/logo/3.png",
      },
      {
        name: "Hoàng Minh Tuấn",
        position: "Giám đốc Xuất khẩu",
        avatar: "/img/logo/4.png",
      },
    ],
    achievements: [
      {
        title: "Top 50 Doanh nghiệp Xuất khẩu",
        year: "2024",
        description: "Bộ Công Thương vinh danh",
      },
      {
        title: "Chứng nhận GlobalGAP",
        year: "2023",
        description: "Cho toàn bộ chuỗi cung ứng nông sản",
      },
      {
        title: "Thương hiệu Quốc gia",
        year: "2022",
        description: "Vietnam Value Program",
      },
    ],
    testimonials: [
      {
        author: "David Chen",
        company: "AEON Mall",
        content:
          "GreenLeaf là đối tác đáng tin cậy với sản phẩm chất lượng và giao hàng đúng hẹn. Chúng tôi rất hài lòng với sự hợp tác.",
        avatar: "/img/logo/1.png",
      },
    ],
    gallery: ["/img/auction/2.webp", "/img/auction/1.jpg", "/img/auction/car.jpg"],
    certifications: ["GlobalGAP", "HACCP", "ISO 22000", "Organic EU"],
  },
];

// Fallback data cho các ID không có trong danh sách chi tiết
export const DEFAULT_CLIENT: Omit<ClientDetail, "id" | "name" | "description" | "logo" | "category" | "rank"> = {
  slogan: "Đối tác tin cậy của TradeHub",
  coverImage: "/img/section1.jpg",
  overview: "Đối tác chiến lược của TradeHub, cùng nhau xây dựng hệ sinh thái giao dịch an toàn và hiệu quả.",
  mission: "Mang đến giá trị tốt nhất cho khách hàng.",
  vision: "Trở thành đối tác hàng đầu trong ngành.",
  coreValues: ["Chất lượng", "Uy tín", "Đổi mới", "Hợp tác"],
  foundedYear: 2015,
  employeeCount: "100+",
  location: "Việt Nam",
  address: "Việt Nam",
  email: "contact@example.com",
  phone: "+84 123 456 789",
  website: "https://example.com",
  products: [],
  leaders: [],
  achievements: [],
  testimonials: [],
  gallery: [],
  certifications: [],
};

// Basic client data để fallback
export const BASIC_CLIENTS = [
  { id: 1, name: "TechNova Solutions", logo: "/img/logo/1.png", category: "Công nghệ", rank: "Platinum", description: "Công ty công nghệ chuyên phát triển giải pháp phần mềm cho doanh nghiệp." },
  { id: 2, name: "GreenLeaf Trading", logo: "/img/logo/2.png", category: "Thương mại", rank: "Gold", description: "Doanh nghiệp thương mại với hệ thống phân phối toàn quốc." },
  { id: 3, name: "BrightMedia Agency", logo: "/img/logo/3.png", category: "Truyền thông", rank: "Gold", description: "Đơn vị truyền thông và marketing sáng tạo hàng đầu." },
  { id: 4, name: "NextGen Manufacturing", logo: "/img/logo/4.png", category: "Sản xuất", rank: "Silver", description: "Công ty sản xuất ứng dụng công nghệ hiện đại." },
  { id: 5, name: "Skyline Consulting", logo: "/img/logo/5.png", category: "Tư vấn", rank: "Silver", description: "Đơn vị tư vấn giải pháp cho doanh nghiệp." },
  { id: 6, name: "EduFuture Academy", logo: "/img/logo/6.png", category: "Giáo dục", rank: "Silver", description: "Tổ chức đào tạo và phát triển kỹ năng." },
  { id: 7, name: "Global Finance Group", logo: "/img/logo/1.png", category: "Tài chính", rank: "Platinum", description: "Tập đoàn tài chính đa quốc gia." },
  { id: 8, name: "InnovateTech Systems", logo: "/img/logo/2.png", category: "Công nghệ", rank: "Gold", description: "Hệ thống công nghệ đổi mới sáng tạo." },
  { id: 9, name: "Prime Logistics", logo: "/img/logo/3.png", category: "Logistics", rank: "Bronze", description: "Dịch vụ logistics hàng đầu." },
  { id: 10, name: "Digital Ventures", logo: "/img/logo/4.png", category: "Đầu tư", rank: "Gold", description: "Công ty đầu tư và phát triển công nghệ số." },
  { id: 11, name: "Elite Real Estate", logo: "/img/logo/5.png", category: "Bất động sản", rank: "Silver", description: "Bất động sản cao cấp." },
  { id: 12, name: "HealthCare Plus", logo: "/img/logo/6.png", category: "Y tế", rank: "Bronze", description: "Dịch vụ chăm sóc sức khỏe toàn diện." },
];

