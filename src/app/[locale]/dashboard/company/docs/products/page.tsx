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
  Space,
  Table,
  Tag,
  Collapse,
  Image,
} from "antd";
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function ProductsDocsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const productFields = [
    { key: "1", field: "Tên sản phẩm", required: true, description: "Tên hiển thị của sản phẩm" },
    { key: "2", field: "Mô tả ngắn", required: true, description: "Mô tả ngắn gọn (50-100 ký tự)" },
    { key: "3", field: "Mô tả chi tiết", required: false, description: "Mô tả đầy đủ tính năng, thông số" },
    { key: "4", field: "Giá bán", required: true, description: "Giá bán hiện tại" },
    { key: "5", field: "Giá gốc", required: false, description: "Giá trước khi giảm (để hiển thị % giảm)" },
    { key: "6", field: "SKU", required: false, description: "Mã sản phẩm nội bộ" },
    { key: "7", field: "Tồn kho", required: true, description: "Số lượng còn trong kho" },
    { key: "8", field: "Danh mục", required: true, description: "Phân loại sản phẩm" },
    { key: "9", field: "Hình ảnh", required: true, description: "Ảnh sản phẩm (tối đa 10 ảnh)" },
  ];

  const columns = [
    { title: "Trường", dataIndex: "field", key: "field", render: (text: string) => <Text strong>{text}</Text> },
    { 
      title: "Bắt buộc", 
      dataIndex: "required", 
      key: "required", 
      render: (required: boolean) => required ? <Tag color="red">Bắt buộc</Tag> : <Tag>Tùy chọn</Tag> 
    },
    { title: "Mô tả", dataIndex: "description", key: "description" },
  ];

  const faqItems = [
    {
      key: "1",
      label: "Hình ảnh sản phẩm có yêu cầu gì?",
      children: (
        <div>
          <ul>
            <li>Định dạng: JPG, PNG, WEBP</li>
            <li>Kích thước tối đa: 5MB/ảnh</li>
            <li>Kích thước khuyến nghị: 800x800px (tỷ lệ 1:1)</li>
            <li>Nền trắng hoặc trong suốt được ưu tiên</li>
          </ul>
        </div>
      ),
    },
    {
      key: "2",
      label: "Làm sao để sản phẩm hiển thị nổi bật?",
      children: "Bật tùy chọn 'Sản phẩm nổi bật' khi tạo/sửa sản phẩm. Sản phẩm sẽ được ưu tiên hiển thị trên trang chủ.",
    },
    {
      key: "3",
      label: "Sản phẩm bị ẩn khi nào?",
      children: "Sản phẩm tự động ẩn khi: Tắt hiển thị, Hết hàng (tồn kho = 0), hoặc bị vi phạm chính sách.",
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
        <AppstoreOutlined style={{ marginRight: 12, color: "#10b981" }} />
        Quản lý sản phẩm
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16 }}>
        Hướng dẫn chi tiết về cách thêm, sửa và quản lý sản phẩm trên cửa hàng
      </Paragraph>

      {/* Add Product Steps */}
      <Card title="Thêm sản phẩm mới" style={{ marginBottom: 24 }}>
        <Steps
          direction="vertical"
          items={[
            {
              title: "Truy cập trang thêm sản phẩm",
              description: "Vào Sản phẩm → Thêm mới hoặc nhấn nút 'Thêm sản phẩm' trên header",
              icon: <PlusOutlined />,
            },
            {
              title: "Điền thông tin cơ bản",
              description: "Nhập tên, mô tả, giá bán và số lượng tồn kho",
              icon: <EditOutlined />,
            },
            {
              title: "Upload hình ảnh",
              description: "Tải lên ít nhất 1 hình ảnh sản phẩm (khuyến nghị 3-5 ảnh)",
              icon: <AppstoreOutlined />,
            },
            {
              title: "Chọn danh mục",
              description: "Phân loại sản phẩm vào danh mục phù hợp",
              icon: <AppstoreOutlined />,
            },
            {
              title: "Lưu và xuất bản",
              description: "Nhấn 'Lưu sản phẩm' để hoàn tất",
              icon: <CheckCircleOutlined />,
            },
          ]}
        />
      </Card>

      {/* Product Fields Table */}
      <Card title="Các trường thông tin sản phẩm" style={{ marginBottom: 24 }}>
        <Table columns={columns} dataSource={productFields} pagination={false} size="small" />
      </Card>

      {/* Tips */}
      <Alert
        message="Mẹo tối ưu sản phẩm"
        description={
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Sử dụng tiêu đề rõ ràng, bao gồm thương hiệu và tính năng chính</li>
            <li>Viết mô tả chi tiết với các bullet points</li>
            <li>Thêm nhiều hình ảnh từ các góc khác nhau</li>
            <li>Đặt giá cạnh tranh và hiển thị % giảm giá nếu có</li>
            <li>Sử dụng tags phù hợp để tăng khả năng tìm kiếm</li>
          </ul>
        }
        type="info"
        showIcon
        icon={<BulbOutlined />}
        style={{ marginBottom: 24 }}
      />

      {/* Warning */}
      <Alert
        message="Lưu ý quan trọng"
        description="Sản phẩm vi phạm chính sách (hàng cấm, hàng giả, nội dung không phù hợp) sẽ bị xóa và tài khoản có thể bị khóa."
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
        <Link href={`/${locale}/dashboard/company/docs`}>
          <Button>← Trang trước</Button>
        </Link>
        <Link href={`/${locale}/dashboard/company/docs/orders`}>
          <Button type="primary">Quản lý đơn hàng →</Button>
        </Link>
      </div>
    </div>
  );
}

