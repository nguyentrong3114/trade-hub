"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Modal,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  id: string;
  customer: string;
  company: string;
  products: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  paymentStatus: "paid" | "unpaid" | "refunded";
}

const mockOrders: OrderData[] = [
  {
    key: "1",
    id: "ORD-2024-001",
    customer: "Nguyễn Văn A",
    company: "TechNova Solutions",
    products: 3,
    total: 1500000,
    status: "delivered",
    createdAt: "2024-01-15",
    paymentStatus: "paid",
  },
  {
    key: "2",
    id: "ORD-2024-002",
    customer: "Trần Thị B",
    company: "GreenLeaf Trading",
    products: 1,
    total: 500000,
    status: "shipped",
    createdAt: "2024-01-16",
    paymentStatus: "paid",
  },
  {
    key: "3",
    id: "ORD-2024-003",
    customer: "Lê Văn C",
    company: "TechNova Solutions",
    products: 5,
    total: 3000000,
    status: "processing",
    createdAt: "2024-01-17",
    paymentStatus: "unpaid",
  },
  {
    key: "4",
    id: "ORD-2024-004",
    customer: "Phạm Thị D",
    company: "GlobalTrade Inc",
    products: 2,
    total: 800000,
    status: "cancelled",
    createdAt: "2024-01-18",
    paymentStatus: "refunded",
  },
];

export default function OrdersPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns: ColumnsType<OrderData> = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (count) => `${count} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (amount) => (
        <Typography.Text strong>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)}
        </Typography.Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          pending: { color: "warning", text: "Chờ xử lý" },
          processing: { color: "processing", text: "Đang xử lý" },
          shipped: { color: "blue", text: "Đã giao hàng" },
          delivered: { color: "success", text: "Đã nhận" },
          cancelled: { color: "error", text: "Đã hủy" },
        };
        const { color, text } = config[status as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        const config = {
          paid: { color: "success", text: "Đã thanh toán" },
          unpaid: { color: "warning", text: "Chưa thanh toán" },
          refunded: { color: "default", text: "Đã hoàn tiền" },
        };
        const { color, text } = config[status as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedOrder(record);
            setModalVisible(true);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const filteredData = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.company.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredData
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <Title level={2}>Quản lý Đơn hàng</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <ShoppingCartOutlined style={{ fontSize: 24, color: "#3b82f6" }} />
              <div>
                <Typography.Text type="secondary">Tổng đơn hàng</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {filteredData.length}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <DollarOutlined style={{ fontSize: 24, color: "#10b981" }} />
              <div>
                <Typography.Text type="secondary">Tổng doanh thu</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    totalRevenue
                  )}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo mã đơn, khách hàng..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "Tất cả trạng thái", value: "all" },
                { label: "Chờ xử lý", value: "pending" },
                { label: "Đang xử lý", value: "processing" },
                { label: "Đã giao hàng", value: "shipped" },
                { label: "Đã nhận", value: "delivered" },
                { label: "Đã hủy", value: "cancelled" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <RangePicker style={{ width: "100%" }} />
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách đơn hàng (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        />
      </Card>

      <Modal
        title="Chi tiết đơn hàng"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[<Button key="close" onClick={() => setModalVisible(false)}>Đóng</Button>]}
        width={700}
      >
        {selectedOrder && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Mã đơn">{selectedOrder.id}</Descriptions.Item>
            <Descriptions.Item label="Khách hàng">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Company">{selectedOrder.company}</Descriptions.Item>
            <Descriptions.Item label="Số sản phẩm">{selectedOrder.products} sản phẩm</Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                selectedOrder.total
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag
                color={
                  selectedOrder.status === "delivered"
                    ? "success"
                    : selectedOrder.status === "cancelled"
                    ? "error"
                    : "processing"
                }
              >
                {selectedOrder.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Thanh toán">
              <Tag
                color={
                  selectedOrder.paymentStatus === "paid"
                    ? "success"
                    : selectedOrder.paymentStatus === "unpaid"
                    ? "warning"
                    : "default"
                }
              >
                {selectedOrder.paymentStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(selectedOrder.createdAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

