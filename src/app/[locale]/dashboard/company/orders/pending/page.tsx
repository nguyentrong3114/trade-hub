"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Space,
  Typography,
  Modal,
  message,
  Descriptions,
  List,
  Avatar,
} from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface PendingOrder {
  key: string;
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  note: string;
  createdAt: string;
}

const mockPendingOrders: PendingOrder[] = [
  {
    key: "1",
    id: "DH001",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0901234567",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    items: [
      { name: "iPhone 15 Pro Max", quantity: 1, price: 34990000 },
      { name: "AirPods Pro 2", quantity: 1, price: 6990000 },
    ],
    total: 41980000,
    note: "Giao hàng giờ hành chính",
    createdAt: "2024-01-20 14:30",
  },
  {
    key: "2",
    id: "DH006",
    customer: "Trần Văn B",
    email: "tranvanb@gmail.com",
    phone: "0912345678",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    items: [{ name: "MacBook Pro 14 M3", quantity: 1, price: 49990000 }],
    total: 49990000,
    note: "",
    createdAt: "2024-01-20 15:00",
  },
];

export default function PendingOrdersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = (id: string) => {
    Modal.confirm({
      title: "Xác nhận đơn hàng",
      content: `Bạn có chắc muốn xác nhận đơn hàng ${id}?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        message.success(`Đã xác nhận đơn hàng ${id}`);
      },
    });
  };

  const handleReject = (id: string) => {
    Modal.confirm({
      title: "Từ chối đơn hàng",
      content: `Bạn có chắc muốn từ chối đơn hàng ${id}?`,
      okText: "Từ chối",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        message.success(`Đã từ chối đơn hàng ${id}`);
      },
    });
  };

  const showDetail = (order: PendingOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const columns: TableProps<PendingOrder>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong style={{ color: "#f59e0b" }}>{text}</Text>,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            <PhoneOutlined /> {record.phone}
          </Text>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      key: "items",
      render: (items) => `${items.length} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <Text strong>{total.toLocaleString("vi-VN")}đ</Text>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Space>
          <ClockCircleOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => showDetail(record)}>
            Chi tiết
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleConfirm(record.id)}
          >
            Xác nhận
          </Button>
          <Button
            size="small"
            danger
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Đơn hàng chờ xử lý</Title>
        <Text type="secondary">Xác nhận hoặc từ chối các đơn hàng mới</Text>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={mockPendingOrders}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={`Chi tiết đơn hàng ${selectedOrder?.id}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="reject" danger onClick={() => handleReject(selectedOrder?.id || "")}>
            Từ chối
          </Button>,
          <Button key="confirm" type="primary" onClick={() => handleConfirm(selectedOrder?.id || "")}>
            Xác nhận đơn hàng
          </Button>,
        ]}
        width={600}
      >
        {selectedOrder && (
          <>
            <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="Khách hàng">{selectedOrder.customer}</Descriptions.Item>
              <Descriptions.Item label="Điện thoại">{selectedOrder.phone}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedOrder.email}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
              <Descriptions.Item label="Ghi chú">{selectedOrder.note || "Không có"}</Descriptions.Item>
            </Descriptions>

            <List
              header={<Text strong>Danh sách sản phẩm</Text>}
              dataSource={selectedOrder.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`Số lượng: ${item.quantity}`}
                  />
                  <Text strong>{item.price.toLocaleString("vi-VN")}đ</Text>
                </List.Item>
              )}
            />

            <div style={{ textAlign: "right", marginTop: 16 }}>
              <Text style={{ fontSize: 16 }}>Tổng cộng: </Text>
              <Text strong style={{ fontSize: 18, color: "#10b981" }}>
                {selectedOrder.total.toLocaleString("vi-VN")}đ
              </Text>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

