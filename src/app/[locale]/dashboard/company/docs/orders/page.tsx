"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Typography,
  Steps,
  Alert,
  Divider,
  Button,
  Tag,
  Timeline,
  Collapse,
} from "antd";
import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CloseCircleOutlined,
  BulbOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function OrdersDocsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const orderStatuses = [
    { status: "Chờ xử lý", color: "orange", description: "Đơn hàng mới, chờ xác nhận từ seller" },
    { status: "Đã xác nhận", color: "blue", description: "Seller đã xác nhận, đang chuẩn bị hàng" },
    { status: "Đang giao", color: "cyan", description: "Đã giao cho đơn vị vận chuyển" },
    { status: "Hoàn thành", color: "green", description: "Khách đã nhận hàng thành công" },
    { status: "Đã hủy", color: "red", description: "Đơn hàng đã bị hủy" },
  ];

  const faqItems = [
    {
      key: "1",
      label: "Thời gian xử lý đơn hàng là bao lâu?",
      children: "Bạn cần xử lý đơn hàng trong vòng 24 giờ kể từ khi nhận được. Đơn hàng không được xử lý sẽ tự động hủy sau 48 giờ.",
    },
    {
      key: "2",
      label: "Làm sao để hủy đơn hàng?",
      children: "Bạn chỉ có thể hủy đơn hàng ở trạng thái 'Chờ xử lý' hoặc 'Đã xác nhận'. Đơn hàng đang giao không thể hủy từ phía seller.",
    },
    {
      key: "3",
      label: "Quy trình hoàn tiền như thế nào?",
      children: "Khi đơn hàng bị hủy hoặc hoàn, tiền sẽ được hoàn lại cho khách trong 3-5 ngày làm việc. Phí vận chuyển sẽ được trừ nếu hàng đã giao.",
    },
    {
      key: "4",
      label: "Làm sao để in phiếu giao hàng?",
      children: "Vào chi tiết đơn hàng → Nhấn nút 'In đơn hàng'. File PDF sẽ được tạo với đầy đủ thông tin giao hàng.",
    },
  ];

  return (
    <div>
      <Link href={`/${locale}/dashboard/company/docs`}>
        <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: 24 }}>
          Quay lại Tài liệu
        </Button>
      </Link>

      <Title level={2}>
        <ShoppingCartOutlined style={{ marginRight: 12, color: "#3b82f6" }} />
        Quản lý đơn hàng
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16 }}>
        Hướng dẫn xử lý đơn hàng, theo dõi vận chuyển và giải quyết khiếu nại
      </Paragraph>

      {/* Order Status */}
      <Card title="Trạng thái đơn hàng" style={{ marginBottom: 24 }}>
        <Timeline
          items={orderStatuses.map((item) => ({
            color: item.color,
            children: (
              <>
                <Tag color={item.color}>{item.status}</Tag>
                <Text type="secondary" style={{ marginLeft: 8 }}>{item.description}</Text>
              </>
            ),
          }))}
        />
      </Card>

      {/* Process Steps */}
      <Card title="Quy trình xử lý đơn hàng" style={{ marginBottom: 24 }}>
        <Steps
          direction="vertical"
          items={[
            {
              title: "Nhận đơn hàng mới",
              description: "Bạn nhận được thông báo khi có đơn hàng mới. Kiểm tra thông tin đơn hàng.",
              icon: <ClockCircleOutlined />,
            },
            {
              title: "Xác nhận đơn hàng",
              description: "Kiểm tra tồn kho và xác nhận đơn hàng. Liên hệ khách nếu cần.",
              icon: <CheckCircleOutlined />,
            },
            {
              title: "Đóng gói hàng",
              description: "Đóng gói cẩn thận, đảm bảo hàng không bị hư hại trong vận chuyển.",
              icon: <ShoppingCartOutlined />,
            },
            {
              title: "Giao cho shipper",
              description: "In phiếu giao hàng và bàn giao cho đơn vị vận chuyển.",
              icon: <CarOutlined />,
            },
            {
              title: "Theo dõi và hoàn thành",
              description: "Theo dõi tình trạng giao hàng. Đơn hoàn thành khi khách nhận hàng.",
              icon: <CheckCircleOutlined />,
            },
          ]}
        />
      </Card>

      {/* Tips */}
      <Alert
        message="Mẹo xử lý đơn hàng hiệu quả"
        description={
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Xử lý đơn hàng nhanh chóng để tăng uy tín cửa hàng</li>
            <li>Đóng gói cẩn thận với vật liệu chống sốc</li>
            <li>Chụp ảnh sản phẩm trước khi gửi để đề phòng khiếu nại</li>
            <li>Cập nhật thông tin vận chuyển cho khách hàng</li>
            <li>Phản hồi tin nhắn khách hàng trong vòng 2 giờ</li>
          </ul>
        }
        type="info"
        showIcon
        icon={<BulbOutlined />}
        style={{ marginBottom: 24 }}
      />

      {/* Warning */}
      <Alert
        message="Lưu ý về tỷ lệ hủy đơn"
        description="Tỷ lệ hủy đơn cao (>5%) sẽ ảnh hưởng đến xếp hạng cửa hàng và có thể bị hạn chế tính năng."
        type="warning"
        showIcon
        icon={<WarningOutlined />}
        style={{ marginBottom: 24 }}
      />

      {/* FAQ */}
      <Card title="Câu hỏi thường gặp">
        <Collapse items={faqItems} bordered={false} />
      </Card>

      {/* Navigation */}
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/${locale}/dashboard/company/docs/products`}>
          <Button>← Quản lý sản phẩm</Button>
        </Link>
        <Link href={`/${locale}/dashboard/company/docs/api`}>
          <Button type="primary">API Reference →</Button>
        </Link>
      </div>
    </div>
  );
}

