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
  Timeline,
  Descriptions,
} from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface ShippingOrder {
  key: string;
  id: string;
  customer: string;
  phone: string;
  address: string;
  shipper: string;
  shipperPhone: string;
  total: number;
  shippedAt: string;
  estimatedDelivery: string;
  trackingHistory: { time: string; status: string; location: string }[];
}

const mockShippingOrders: ShippingOrder[] = [
  {
    key: "1",
    id: "DH003",
    customer: "Lê Văn C",
    phone: "0923456789",
    address: "789 Võ Văn Tần, Q.3, TP.HCM",
    shipper: "Nguyễn Văn Ship",
    shipperPhone: "0987654321",
    total: 12970000,
    shippedAt: "2024-01-19 16:45",
    estimatedDelivery: "2024-01-21",
    trackingHistory: [
      { time: "2024-01-19 16:45", status: "Đã giao cho shipper", location: "Kho Q.1" },
      { time: "2024-01-19 18:00", status: "Đang vận chuyển", location: "Trung tâm phân phối Q.3" },
      { time: "2024-01-20 09:00", status: "Đang giao hàng", location: "Gần địa chỉ người nhận" },
    ],
  },
  {
    key: "2",
    id: "DH007",
    customer: "Phạm Văn D",
    phone: "0934567890",
    address: "101 Nguyễn Thị Minh Khai, Q.1, TP.HCM",
    shipper: "Trần Văn Giao",
    shipperPhone: "0976543210",
    total: 34990000,
    shippedAt: "2024-01-20 08:00",
    estimatedDelivery: "2024-01-22",
    trackingHistory: [
      { time: "2024-01-20 08:00", status: "Đã giao cho shipper", location: "Kho Q.1" },
      { time: "2024-01-20 10:30", status: "Đang vận chuyển", location: "Trung tâm phân phối Q.1" },
    ],
  },
];

export default function ShippingOrdersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận hoàn thành",
      content: `Xác nhận đơn hàng ${id} đã giao thành công?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        message.success(`Đơn hàng ${id} đã hoàn thành`);
      },
    });
  };

  const showTracking = (order: ShippingOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const columns: TableProps<ShippingOrder>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong style={{ color: "#06b6d4" }}>{text}</Text>,
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <Space>
          <EnvironmentOutlined />
          <Text ellipsis style={{ maxWidth: 200 }}>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Shipper",
      dataIndex: "shipper",
      key: "shipper",
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.shipperPhone}</Text>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <Text strong>{total.toLocaleString("vi-VN")}đ</Text>,
    },
    {
      title: "Dự kiến giao",
      dataIndex: "estimatedDelivery",
      key: "estimatedDelivery",
      render: (text) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<CarOutlined />} onClick={() => showTracking(record)}>
            Theo dõi
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleComplete(record.id)}
          >
            Hoàn thành
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Đơn hàng đang giao</Title>
        <Text type="secondary">Theo dõi tình trạng vận chuyển</Text>
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
          dataSource={mockShippingOrders}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={`Theo dõi đơn hàng ${selectedOrder?.id}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        {selectedOrder && (
          <>
            <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="Khách hàng">{selectedOrder.customer}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
              <Descriptions.Item label="Shipper">{selectedOrder.shipper} - {selectedOrder.shipperPhone}</Descriptions.Item>
              <Descriptions.Item label="Dự kiến giao">{selectedOrder.estimatedDelivery}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>Lịch sử vận chuyển</Title>
            <Timeline
              items={selectedOrder.trackingHistory.map((item, index) => ({
                color: index === selectedOrder.trackingHistory.length - 1 ? "green" : "blue",
                children: (
                  <>
                    <Text strong>{item.status}</Text>
                    <br />
                    <Text type="secondary">{item.location}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                  </>
                ),
              }))}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

