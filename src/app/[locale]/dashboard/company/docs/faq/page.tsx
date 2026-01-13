"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Typography,
  Input,
  Collapse,
  Tag,
  Button,
  Space,
  Divider,
  Empty,
} from "antd";
import {
  ArrowLeftOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ShoppingOutlined,
  DollarOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function FaqPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: "Tất cả", icon: <QuestionCircleOutlined /> },
    { key: "product", label: "Sản phẩm", icon: <ShoppingOutlined /> },
    { key: "order", label: "Đơn hàng", icon: <CarOutlined /> },
    { key: "payment", label: "Thanh toán", icon: <DollarOutlined /> },
    { key: "account", label: "Tài khoản", icon: <SafetyCertificateOutlined /> },
    { key: "technical", label: "Kỹ thuật", icon: <SettingOutlined /> },
  ];

  const faqData = [
    // Product
    { 
      key: "1", 
      category: "product", 
      question: "Làm sao để thêm sản phẩm mới?", 
      answer: "Vào menu Sản phẩm → Thêm mới. Điền đầy đủ thông tin sản phẩm bao gồm tên, mô tả, giá, hình ảnh và danh mục. Nhấn nút 'Lưu sản phẩm' để hoàn tất." 
    },
    { 
      key: "2", 
      category: "product", 
      question: "Hình ảnh sản phẩm có yêu cầu gì?", 
      answer: "Định dạng JPG, PNG hoặc WEBP. Kích thước tối đa 5MB/ảnh. Khuyến nghị 800x800px với nền trắng hoặc trong suốt." 
    },
    { 
      key: "3", 
      category: "product", 
      question: "Tại sao sản phẩm của tôi bị ẩn?", 
      answer: "Sản phẩm có thể bị ẩn do: Bạn tắt hiển thị, Hết hàng (tồn kho = 0), hoặc Vi phạm chính sách. Kiểm tra và cập nhật lại thông tin sản phẩm." 
    },
    { 
      key: "4", 
      category: "product", 
      question: "Làm sao để sản phẩm hiển thị nổi bật?", 
      answer: "Bật tùy chọn 'Sản phẩm nổi bật' khi tạo/sửa sản phẩm. Sản phẩm sẽ được ưu tiên hiển thị trên trang chủ và kết quả tìm kiếm." 
    },
    
    // Order
    { 
      key: "5", 
      category: "order", 
      question: "Thời gian xử lý đơn hàng là bao lâu?", 
      answer: "Bạn cần xử lý đơn hàng trong vòng 24 giờ. Đơn hàng không được xử lý sẽ tự động hủy sau 48 giờ và ảnh hưởng đến xếp hạng cửa hàng." 
    },
    { 
      key: "6", 
      category: "order", 
      question: "Làm sao để hủy đơn hàng?", 
      answer: "Bạn chỉ có thể hủy đơn hàng ở trạng thái 'Chờ xử lý' hoặc 'Đã xác nhận'. Vào chi tiết đơn hàng → Nhấn 'Hủy đơn' và chọn lý do." 
    },
    { 
      key: "7", 
      category: "order", 
      question: "Làm sao để in phiếu giao hàng?", 
      answer: "Vào chi tiết đơn hàng → Nhấn nút 'In đơn hàng'. File PDF sẽ được tạo với đầy đủ thông tin người nhận và danh sách sản phẩm." 
    },
    
    // Payment
    { 
      key: "8", 
      category: "payment", 
      question: "Phí giao dịch được tính như thế nào?", 
      answer: "Phí giao dịch là 2% trên mỗi đơn hàng thành công. Không tính phí cho đơn hàng bị hủy hoặc hoàn tiền. Phí được trừ tự động khi bạn rút tiền." 
    },
    { 
      key: "9", 
      category: "payment", 
      question: "Thời gian rút tiền là bao lâu?", 
      answer: "Yêu cầu rút tiền được xử lý trong 1-3 ngày làm việc. Tiền sẽ được chuyển vào tài khoản ngân hàng bạn đã đăng ký." 
    },
    { 
      key: "10", 
      category: "payment", 
      question: "Số tiền rút tối thiểu là bao nhiêu?", 
      answer: "Số tiền rút tối thiểu là 100,000 VNĐ. Không giới hạn số tiền tối đa (phụ thuộc vào số dư khả dụng)." 
    },
    { 
      key: "11", 
      category: "payment", 
      question: "Quy trình hoàn tiền như thế nào?", 
      answer: "Khi đơn hàng bị hủy/hoàn, tiền sẽ được hoàn lại cho khách trong 3-5 ngày làm việc. Số tiền hoàn sẽ được trừ từ số dư của bạn." 
    },
    
    // Account
    { 
      key: "12", 
      category: "account", 
      question: "Làm sao để xác minh tài khoản?", 
      answer: "Vào Hồ sơ công ty → Upload giấy phép kinh doanh và CCCD/CMND của người đại diện. Quá trình xác minh mất 1-2 ngày làm việc." 
    },
    { 
      key: "13", 
      category: "account", 
      question: "Tại sao tài khoản bị giới hạn tính năng?", 
      answer: "Tài khoản chưa xác minh hoặc có tỷ lệ hủy đơn cao (>5%) sẽ bị giới hạn. Hoàn thành xác minh và cải thiện chất lượng để mở khóa." 
    },
    { 
      key: "14", 
      category: "account", 
      question: "Làm sao để đổi mật khẩu?", 
      answer: "Vào Cài đặt → Bảo mật → Đổi mật khẩu. Nhập mật khẩu hiện tại và mật khẩu mới (tối thiểu 8 ký tự)." 
    },
    
    // Technical
    { 
      key: "15", 
      category: "technical", 
      question: "Làm sao để tích hợp API?", 
      answer: "Vào Cài đặt → API & Tích hợp để lấy API key. Xem tài liệu API Reference để biết chi tiết về endpoints và authentication." 
    },
    { 
      key: "16", 
      category: "technical", 
      question: "Webhook là gì và cấu hình như thế nào?", 
      answer: "Webhook cho phép bạn nhận thông báo realtime khi có sự kiện (đơn hàng mới, thanh toán...). Cấu hình trong Cài đặt → API & Tích hợp." 
    },
    { 
      key: "17", 
      category: "technical", 
      question: "Hỗ trợ những ngôn ngữ lập trình nào?", 
      answer: "Chúng tôi cung cấp SDK cho JavaScript/Node.js, Python và PHP. REST API có thể sử dụng với bất kỳ ngôn ngữ nào." 
    },
  ];

  const filteredFaq = faqData.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.question.toLowerCase().includes(searchText.toLowerCase()) ||
                       item.answer.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <Link href={`/${locale}/dashboard/company/docs`}>
        <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: 24 }}>
          Quay lại Tài liệu
        </Button>
      </Link>

      <Title level={2}>
        <QuestionCircleOutlined style={{ marginRight: 12, color: "#f59e0b" }} />
        Câu hỏi thường gặp (FAQ)
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16 }}>
        Tìm câu trả lời cho các thắc mắc phổ biến
      </Paragraph>

      {/* Search */}
      <Input
        size="large"
        placeholder="Tìm kiếm câu hỏi..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 24 }}
      />

      {/* Category Filter */}
      <Space wrap style={{ marginBottom: 24 }}>
        {categories.map((cat) => (
          <Button
            key={cat.key}
            type={activeCategory === cat.key ? "primary" : "default"}
            icon={cat.icon}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </Space>

      {/* FAQ List */}
      {filteredFaq.length > 0 ? (
        <Collapse
          items={filteredFaq.map((item) => ({
            key: item.key,
            label: (
              <Space>
                <Text strong>{item.question}</Text>
                <Tag>{categories.find((c) => c.key === item.category)?.label}</Tag>
              </Space>
            ),
            children: <Paragraph>{item.answer}</Paragraph>,
          }))}
        />
      ) : (
        <Empty description="Không tìm thấy câu hỏi phù hợp" />
      )}

      {/* Support CTA */}
      <Card style={{ marginTop: 24, textAlign: "center", background: "#f9fafb" }}>
        <Title level={4}>Không tìm thấy câu trả lời?</Title>
        <Paragraph type="secondary">
          Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn
        </Paragraph>
        <Link href={`/${locale}/dashboard/company/support`}>
          <Button type="primary" size="large">Liên hệ hỗ trợ</Button>
        </Link>
      </Card>

      {/* Navigation */}
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/${locale}/dashboard/company/docs/api`}>
          <Button>← API Reference</Button>
        </Link>
        <Link href={`/${locale}/dashboard/company/docs`}>
          <Button type="primary">Về trang Tài liệu</Button>
        </Link>
      </div>
    </div>
  );
}

