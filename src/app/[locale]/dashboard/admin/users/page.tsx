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
  Select,
  DatePicker,
  Dropdown,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface UserData {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  type: "user" | "company";
  status: "active" | "pending" | "banned";
  createdAt: string;
  lastLogin: string;
}

const mockUsers: UserData[] = [
  {
    key: "1",
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "+84 912 345 678",
    type: "user",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
  },
  {
    key: "2",
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "+84 923 456 789",
    type: "user",
    status: "active",
    createdAt: "2024-01-14",
    lastLogin: "2024-01-19",
  },
  {
    key: "3",
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "+84 934 567 890",
    type: "user",
    status: "banned",
    createdAt: "2024-01-12",
    lastLogin: "2024-01-10",
  },
  {
    key: "4",
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "+84 945 678 901",
    type: "user",
    status: "pending",
    createdAt: "2024-01-20",
    lastLogin: "-",
  },
  {
    key: "5",
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    phone: "+84 956 789 012",
    type: "user",
    status: "active",
    createdAt: "2024-01-13",
    lastLogin: "2024-01-20",
  },
];

export default function UsersListPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<UserData> = [
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
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {record.phone}
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          active: { color: "success", text: "Hoạt động" },
          pending: { color: "warning", text: "Chờ duyệt" },
          banned: { color: "error", text: "Bị cấm" },
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
      title: "Đăng nhập cuối",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date) => (date === "-" ? "-" : dayjs(date).format("DD/MM/YYYY HH:mm")),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} title="Xem chi tiết" />
          <Button type="text" icon={<EditOutlined />} title="Chỉnh sửa" />
          {record.status === "active" ? (
            <Button
              type="text"
              danger
              icon={<StopOutlined />}
              title="Cấm"
              onClick={() => handleBan(record.id)}
            />
          ) : record.status === "banned" ? (
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              title="Kích hoạt"
              onClick={() => handleActivate(record.id)}
            />
          ) : (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                title="Duyệt"
                onClick={() => handleApprove(record.id)}
              />
              <Button
                type="text"
                danger
                icon={<CloseCircleOutlined />}
                title="Từ chối"
                onClick={() => handleReject(record.id)}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleBan = (id: number) => {
    Modal.confirm({
      title: "Xác nhận cấm người dùng",
      content: "Bạn có chắc chắn muốn cấm người dùng này?",
      onOk: () => {
        message.success("Đã cấm người dùng");
      },
    });
  };

  const handleActivate = (id: number) => {
    Modal.confirm({
      title: "Xác nhận kích hoạt",
      content: "Bạn có chắc chắn muốn kích hoạt người dùng này?",
      onOk: () => {
        message.success("Đã kích hoạt người dùng");
      },
    });
  };

  const handleApprove = (id: number) => {
    message.success("Đã duyệt người dùng");
  };

  const handleReject = (id: number) => {
    Modal.confirm({
      title: "Xác nhận từ chối",
      content: "Bạn có chắc chắn muốn từ chối người dùng này?",
      okButtonProps: { danger: true },
      onOk: () => {
        message.success("Đã từ chối người dùng");
      },
    });
  };

  const filteredData = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.includes(searchText);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesType = typeFilter === "all" || user.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <Title level={2}>Quản lý Người dùng</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tên, email, SĐT..."
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
                { label: "Hoạt động", value: "active" },
                { label: "Chờ duyệt", value: "pending" },
                { label: "Bị cấm", value: "banned" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { label: "Tất cả loại", value: "all" },
                { label: "User", value: "user" },
                { label: "Company", value: "company" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker style={{ width: "100%" }} />
          </Col>
        </Row>
      </Card>

      <Card
        title={`Danh sách người dùng (${filteredData.length})`}
        extra={
          <Space>
            {selectedRowKeys.length > 0 && (
              <Button danger>Xóa đã chọn ({selectedRowKeys.length})</Button>
            )}
            <Button type="primary">Xuất Excel</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng`,
          }}
        />
      </Card>
    </div>
  );
}

