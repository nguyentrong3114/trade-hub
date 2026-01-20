"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Avatar,
  Typography,
  Row,
  Col,
  Modal,
  message,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface BannedUser {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  type: "user" | "company";
  bannedAt: string;
  reason: string;
  bannedBy: string;
}

const mockBannedUsers: BannedUser[] = [
  {
    key: "1",
    id: 1,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "+84 934 567 890",
    type: "user",
    bannedAt: "2024-01-11",
    reason: "Vi phạm điều khoản sử dụng - Spam",
    bannedBy: "Admin A",
  },
  {
    key: "2",
    id: 2,
    name: "SpamCompany Ltd",
    email: "spam@company.com",
    phone: "+84 999 888 777",
    type: "company",
    bannedAt: "2024-01-10",
    reason: "Gian lận trong giao dịch",
    bannedBy: "Admin B",
  },
];

export default function BannedUsersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<BannedUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns: ColumnsType<BannedUser> = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.type === "company" ? "#10b981" : "#3b82f6" }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Typography.Text strong>{text}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "company" ? "green" : "blue"}>
          {type === "company" ? "Company" : "User"}
        </Tag>
      ),
    },
    {
      title: "Lý do cấm",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
    {
      title: "Ngày cấm",
      dataIndex: "bannedAt",
      key: "bannedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Người cấm",
      dataIndex: "bannedBy",
      key: "bannedBy",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setModalVisible(true);
            }}
          >
            Chi tiết
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleUnban(record.id)}
          >
            Gỡ cấm
          </Button>
        </Space>
      ),
    },
  ];

  const handleUnban = (id: number) => {
    Modal.confirm({
      title: "Xác nhận gỡ cấm",
      content: "Bạn có chắc chắn muốn gỡ cấm người dùng này?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success("Đã gỡ cấm người dùng");
      },
    });
  };

  const filteredData = mockBannedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Title level={2}>Người dùng bị cấm</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tên, email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách người dùng bị cấm (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng bị cấm`,
          }}
        />
      </Card>

      <Modal
        title="Chi tiết người dùng bị cấm"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="unban"
            type="primary"
            onClick={() => selectedUser && handleUnban(selectedUser.id)}
          >
            Gỡ cấm
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tên">{selectedUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedUser.phone}</Descriptions.Item>
            <Descriptions.Item label="Loại">
              <Tag color={selectedUser.type === "company" ? "green" : "blue"}>
                {selectedUser.type === "company" ? "Company" : "User"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Lý do cấm">
              <Tag color="error">{selectedUser.reason}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cấm">
              {dayjs(selectedUser.bannedAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Người cấm">{selectedUser.bannedBy}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

