"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Space,
  Tag,
  List,
  Collapse,
  Steps,
  Alert,
  Divider,
} from "antd";
import {
  SearchOutlined,
  BookOutlined,
  RocketOutlined,
  ShoppingOutlined,
  DollarOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const { Title, Text, Paragraph } = Typography;

export default function DocsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchText, setSearchText] = useState("");

  // Quick Start Tour
  const startQuickTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      nextBtnText: "Tiếp →",
      prevBtnText: "← Trước",
      doneBtnText: "Xong ✓",
      steps: [
        {
          popover: {
            title: "🚀 Chào mừng đến với TechCorp Dashboard!",
            description: "Hướng dẫn này sẽ giúp bạn làm quen với các tính năng cơ bản trong vài phút.",
          },
        },
        {
          popover: {
            title: "📦 Bước 1: Thêm sản phẩm đầu tiên",
            description: "Vào Sản phẩm → Thêm mới để tạo sản phẩm. Điền thông tin, hình ảnh và giá cả.",
          },
        },
        {
          popover: {
            title: "🛒 Bước 2: Quản lý đơn hàng",
            description: "Khi có đơn hàng mới, bạn sẽ nhận thông báo. Vào Đơn hàng để xử lý.",
          },
        },
        {
          popover: {
            title: "📊 Bước 3: Theo dõi doanh thu",
            description: "Mục Tài chính giúp bạn theo dõi doanh thu, giao dịch và rút tiền.",
          },
        },
        {
          popover: {
            title: "✅ Hoàn thành!",
            description: "Bạn đã sẵn sàng sử dụng dashboard. Khám phá thêm các tài liệu chi tiết bên dưới!",
          },
        },
      ],
    });
    driverObj.drive();
  };

  const quickLinks = [
    {
      title: "Quản lý sản phẩm",
      description: "Thêm, sửa, xóa sản phẩm và danh mục",
      icon: <ShoppingOutlined style={{ fontSize: 24, color: "#10b981" }} />,
      href: `/${locale}/dashboard/company/docs/products`,
      tags: ["Sản phẩm", "Danh mục", "Tồn kho"],
    },
    {
      title: "Quản lý đơn hàng",
      description: "Xử lý đơn hàng, vận chuyển và hoàn tiền",
      icon: <FileTextOutlined style={{ fontSize: 24, color: "#3b82f6" }} />,
      href: `/${locale}/dashboard/company/docs/orders`,
      tags: ["Đơn hàng", "Vận chuyển", "Hoàn tiền"],
    },
    {
      title: "API Reference",
      description: "Tài liệu API cho developer",
      icon: <ApiOutlined style={{ fontSize: 24, color: "#8b5cf6" }} />,
      href: `/${locale}/dashboard/company/docs/api`,
      tags: ["API", "Webhook", "Integration"],
    },
    {
      title: "Câu hỏi thường gặp",
      description: "Giải đáp các thắc mắc phổ biến",
      icon: <QuestionCircleOutlined style={{ fontSize: 24, color: "#f59e0b" }} />,
      href: `/${locale}/dashboard/company/docs/faq`,
      tags: ["FAQ", "Hỗ trợ"],
    },
  ];

  const gettingStartedSteps = [
    {
      title: "Hoàn thiện hồ sơ",
      description: "Cập nhật thông tin công ty, logo và giấy phép kinh doanh",
    },
    {
      title: "Thêm sản phẩm",
      description: "Tạo danh mục và thêm sản phẩm đầu tiên vào cửa hàng",
    },
    {
      title: "Cấu hình thanh toán",
      description: "Liên kết tài khoản ngân hàng để nhận thanh toán",
    },
    {
      title: "Bắt đầu bán hàng",
      description: "Chia sẻ cửa hàng và bắt đầu nhận đơn hàng",
    },
  ];

  const faqItems = [
    {
      key: "1",
      label: "Làm sao để thêm sản phẩm mới?",
      children: "Vào menu Sản phẩm → Thêm mới. Điền thông tin sản phẩm bao gồm tên, mô tả, giá, hình ảnh và danh mục. Nhấn Lưu để hoàn tất.",
    },
    {
      key: "2",
      label: "Phí giao dịch được tính như thế nào?",
      children: "Phí giao dịch là 2% trên mỗi đơn hàng thành công. Không tính phí cho đơn hàng bị hủy hoặc hoàn tiền.",
    },
    {
      key: "3",
      label: "Thời gian rút tiền là bao lâu?",
      children: "Yêu cầu rút tiền sẽ được xử lý trong vòng 1-3 ngày làm việc. Tiền sẽ được chuyển vào tài khoản ngân hàng đã đăng ký.",
    },
    {
      key: "4",
      label: "Làm sao để tích hợp API?",
      children: "Truy cập mục API Reference để lấy API key và xem tài liệu chi tiết. Hỗ trợ REST API và Webhook.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Title level={2} style={{ margin: 0 }}>
          <BookOutlined style={{ marginRight: 12, color: "#10b981" }} />
          Tài liệu hướng dẫn
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16, marginTop: 8 }}>
          Tìm hiểu cách sử dụng TechCorp Dashboard một cách hiệu quả
        </Paragraph>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: "24px auto 0" }}>
          <Input
            size="large"
            placeholder="Tìm kiếm tài liệu..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", border: "none" }}
            onClick={startQuickTour}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <PlayCircleOutlined style={{ fontSize: 40, color: "white" }} />
              <div>
                <Title level={4} style={{ color: "white", margin: 0 }}>
                  Hướng dẫn nhanh
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Tour tương tác giúp bạn làm quen trong 2 phút
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", border: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <ThunderboltOutlined style={{ fontSize: 40, color: "white" }} />
              <div>
                <Title level={4} style={{ color: "white", margin: 0 }}>
                  Video hướng dẫn
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Xem video chi tiết về các tính năng
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Getting Started Steps */}
      <Card title={<><RocketOutlined /> Bắt đầu sử dụng</>} style={{ marginBottom: 24 }}>
        <Steps
          direction="vertical"
          current={-1}
          items={gettingStartedSteps.map((step, index) => ({
            title: step.title,
            description: step.description,
            icon: <CheckCircleOutlined style={{ color: "#10b981" }} />,
          }))}
        />
        <Alert
          message="Mẹo"
          description="Hoàn thành các bước trên để kích hoạt đầy đủ tính năng của tài khoản."
          type="info"
          showIcon
          icon={<BulbOutlined />}
          style={{ marginTop: 16 }}
        />
      </Card>

      {/* Quick Links */}
      <Title level={4}>Tài liệu theo chủ đề</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {quickLinks.map((link, index) => (
          <Col xs={24} sm={12} key={index}>
            <Link href={link.href}>
              <Card hoverable>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: "#f0fdf4", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text strong style={{ fontSize: 16 }}>{link.title}</Text>
                    <br />
                    <Text type="secondary">{link.description}</Text>
                    <div style={{ marginTop: 8 }}>
                      {link.tags.map((tag) => (
                        <Tag key={tag} style={{ marginRight: 4 }}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                  <ArrowRightOutlined style={{ color: "#10b981" }} />
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* FAQ Preview */}
      <Card 
        title={<><QuestionCircleOutlined /> Câu hỏi thường gặp</>}
        extra={<Link href={`/${locale}/dashboard/company/docs/faq`}>Xem tất cả →</Link>}
      >
        <Collapse items={faqItems} bordered={false} />
      </Card>

      {/* Support CTA */}
      <Card style={{ marginTop: 24, textAlign: "center", background: "#f9fafb" }}>
        <SafetyCertificateOutlined style={{ fontSize: 40, color: "#10b981", marginBottom: 16 }} />
        <Title level={4}>Cần hỗ trợ thêm?</Title>
        <Paragraph type="secondary">
          Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
        </Paragraph>
        <Space>
          <Link href={`/${locale}/dashboard/company/support`}>
            <Button type="primary" size="large">Liên hệ hỗ trợ</Button>
          </Link>
          <Button size="large">Chat trực tuyến</Button>
        </Space>
      </Card>
    </div>
  );
}

