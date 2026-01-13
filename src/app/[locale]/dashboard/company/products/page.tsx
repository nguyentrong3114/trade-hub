"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Space,
  Dropdown,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Select,
  Modal,
  message,
  Image,
} from "antd";
import type { MenuProps, TableProps } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  AppstoreOutlined,
  DollarOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Product {
  key: string;
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    key: "1",
    id: "SP001",
    name: "iPhone 15 Pro Max 256GB",
    image: "/img/section1.jpg",
    category: "Điện thoại",
    price: 34990000,
    stock: 50,
    sold: 120,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    key: "2",
    id: "SP002",
    name: "MacBook Pro 14 inch M3",
    image: "/img/section2.jpg",
    category: "Laptop",
    price: 49990000,
    stock: 25,
    sold: 45,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    key: "3",
    id: "SP003",
    name: "AirPods Pro 2",
    image: "/img/section3.jpg",
    category: "Phụ kiện",
    price: 6990000,
    stock: 0,
    sold: 200,
    status: "out_of_stock",
    createdAt: "2024-01-05",
  },
  {
    key: "4",
    id: "SP004",
    name: "iPad Pro 12.9 inch M2",
    image: "/img/section4.jpg",
    category: "Tablet",
    price: 32990000,
    stock: 15,
    sold: 30,
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    key: "5",
    id: "SP005",
    name: "Apple Watch Ultra 2",
    image: "/img/section5.jpg",
    category: "Đồng hồ",
    price: 21990000,
    stock: 8,
    sold: 55,
    status: "inactive",
    createdAt: "2023-12-20",
  },
];

export default function ProductsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa sản phẩm ${id}?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        message.success("Đã xóa sản phẩm thành công!");
      },
    });
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "active":
        return <Tag color="green">Đang bán</Tag>;
      case "inactive":
        return <Tag color="default">Tạm ngưng</Tag>;
      case "out_of_stock":
        return <Tag color="red">Hết hàng</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const actionItems = (record: Product): MenuProps["items"] => [
    {
      key: "view",
      label: "Xem chi tiết",
      icon: <EyeOutlined />,
    },
    {
      key: "edit",
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
    },
    { type: "divider" },
    {
      key: "delete",
      label: "Xóa",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record.id),
    },
  ];

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src={record.image}
            alt={text}
            width={50}
            height={50}
            style={{ borderRadius: 8, objectFit: "cover" }}
            fallback="/img/section1.jpg"
          />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.id}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <Text strong style={{ color: "#10b981" }}>
          {price.toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Text type={stock === 0 ? "danger" : stock < 10 ? "warning" : undefined}>
          {stock}
        </Text>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: (_, record) => (
        <Dropdown menu={{ items: actionItems(record) }} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = !selectedCategory || product.category === selectedCategory;
    const matchStatus = !selectedStatus || product.status === selectedStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Quản lý sản phẩm</Title>
          <Text type="secondary">Quản lý tất cả sản phẩm của cửa hàng</Text>
        </div>
        <Link href={`/${locale}/dashboard/company/products/add`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng sản phẩm"
              value={mockProducts.length}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Đang bán"
              value={mockProducts.filter((p) => p.status === "active").length}
              valueStyle={{ color: "#10b981" }}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Hết hàng"
              value={mockProducts.filter((p) => p.status === "out_of_stock").length}
              valueStyle={{ color: "#ef4444" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng đã bán"
              value={mockProducts.reduce((sum, p) => sum + p.sold, 0)}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Danh mục"
            style={{ width: 150 }}
            allowClear
            onChange={setSelectedCategory}
            options={[
              { value: "Điện thoại", label: "Điện thoại" },
              { value: "Laptop", label: "Laptop" },
              { value: "Tablet", label: "Tablet" },
              { value: "Phụ kiện", label: "Phụ kiện" },
              { value: "Đồng hồ", label: "Đồng hồ" },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            style={{ width: 150 }}
            allowClear
            onChange={setSelectedStatus}
            options={[
              { value: "active", label: "Đang bán" },
              { value: "inactive", label: "Tạm ngưng" },
              { value: "out_of_stock", label: "Hết hàng" },
            ]}
          />
          <Button icon={<ExportOutlined />}>Xuất Excel</Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>
    </div>
  );
}

