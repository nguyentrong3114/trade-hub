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
  Modal,
  Checkbox,
  message,
  Divider,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface UserData {
  key: string;
  id: string;
  name: string;
  email: string;
  userType: "user" | "company" | "admin";
  role?: string;
  capabilities: string[];
  status: "active" | "pending" | "banned";
  createdAt: string;
}

// Mock data
const mockUsers: UserData[] = [
  {
    key: "1",
    id: "user_1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    userType: "user",
    role: "customer",
    capabilities: ["view_products", "create_orders"],
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    key: "2",
    id: "user_2",
    name: "TechCorp Ltd",
    email: "contact@techcorp.com",
    userType: "company",
    role: "company_owner",
    capabilities: [
      "create_products",
      "edit_products",
      "delete_products",
      "manage_orders",
      "view_reports",
    ],
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    key: "3",
    id: "user_3",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    userType: "user",
    role: "customer",
    capabilities: ["view_products"],
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    key: "4",
    id: "user_4",
    name: "GlobalTrade Inc",
    email: "info@globaltrade.com",
    userType: "company",
    role: "company_manager",
    capabilities: ["edit_products", "manage_orders", "view_reports"],
    status: "active",
    createdAt: "2024-01-13",
  },
];

// Capability groups
const capabilityGroups = {
  "Product Management": [
    { value: "create_products", label: "Tạo sản phẩm" },
    { value: "edit_products", label: "Sửa sản phẩm" },
    { value: "edit_others_products", label: "Sửa sản phẩm của người khác" },
    { value: "delete_products", label: "Xóa sản phẩm" },
    { value: "publish_products", label: "Xuất bản sản phẩm" },
    { value: "list_products", label: "Xem danh sách sản phẩm" },
  ],
  "Order Management": [
    { value: "create_orders", label: "Tạo đơn hàng" },
    { value: "edit_orders", label: "Sửa đơn hàng" },
    { value: "list_orders", label: "Xem đơn hàng" },
    { value: "manage_order_status", label: "Quản lý trạng thái đơn hàng" },
    { value: "cancel_orders", label: "Hủy đơn hàng" },
  ],
  "Inventory": [
    { value: "view_inventory", label: "Xem kho hàng" },
    { value: "edit_inventory", label: "Sửa kho hàng" },
    { value: "manage_stock", label: "Quản lý tồn kho" },
  ],
  "Reports": [
    { value: "view_reports", label: "Xem báo cáo" },
    { value: "view_analytics", label: "Xem phân tích" },
    { value: "export_data", label: "Xuất dữ liệu" },
    { value: "view_financial_reports", label: "Xem báo cáo tài chính" },
  ],
  "User Management": [
    { value: "create_employees", label: "Tạo nhân viên" },
    { value: "edit_employees", label: "Sửa nhân viên" },
    { value: "delete_employees", label: "Xóa nhân viên" },
    { value: "manage_employee_roles", label: "Quản lý vai trò nhân viên" },
    { value: "list_employees", label: "Xem danh sách nhân viên" },
  ],
  "Company Management": [
    { value: "manage_company_settings", label: "Quản lý cài đặt công ty" },
    { value: "manage_stores", label: "Quản lý cửa hàng" },
    { value: "create_stores", label: "Tạo cửa hàng" },
  ],
};

export default function UserPermissionsPage() {
  const [searchText, setSearchText] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: ColumnsType<UserData> = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar
            style={{
              backgroundColor:
                record.userType === "company"
                  ? "#10b981"
                  : record.userType === "admin"
                  ? "#dc2626"
                  : "#3b82f6",
            }}
          >
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
      dataIndex: "userType",
      key: "userType",
      render: (type) => {
        const config = {
          admin: { color: "red", text: "Admin" },
          company: { color: "green", text: "Company" },
          user: { color: "blue", text: "User" },
        };
        const { color, text } = config[type as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (role ? <Tag>{role}</Tag> : "-"),
    },
    {
      title: "Quyền hiện tại",
      dataIndex: "capabilities",
      key: "capabilities",
      render: (capabilities: string[]) => (
        <Space wrap>
          {capabilities.length > 0 ? (
            capabilities.slice(0, 3).map((cap) => (
              <Tag key={cap} color="blue">
                {cap.replace(/_/g, " ")}
              </Tag>
            ))
          ) : (
            <Text type="secondary">Không có</Text>
          )}
          {capabilities.length > 3 && (
            <Tag>+{capabilities.length - 3} quyền khác</Tag>
          )}
        </Space>
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEditPermissions(record)}
        >
          Cấp quyền
        </Button>
      ),
    },
  ];

  const handleEditPermissions = (user: UserData) => {
    setSelectedUser(user);
    setSelectedCapabilities([...user.capabilities]);
    setIsModalVisible(true);
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return;

    // TODO: Gọi API để lưu permissions
    // await apiRequestJson(`/api/admin/users/${selectedUser.id}/permissions`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ capabilities: selectedCapabilities })
    // });

    message.success(`Đã cập nhật quyền cho ${selectedUser.name}`);
    setIsModalVisible(false);
    setSelectedUser(null);
    setSelectedCapabilities([]);

    // Update mock data (trong thực tế sẽ refetch từ API)
    const userIndex = mockUsers.findIndex((u) => u.id === selectedUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex].capabilities = selectedCapabilities;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setSelectedCapabilities([]);
  };

  const toggleCapability = (capability: string) => {
    if (selectedCapabilities.includes(capability)) {
      setSelectedCapabilities(
        selectedCapabilities.filter((cap) => cap !== capability)
      );
    } else {
      setSelectedCapabilities([...selectedCapabilities, capability]);
    }
  };

  const filteredData = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesType =
      userTypeFilter === "all" || user.userType === userTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <Title level={2}>Quản lý Quyền Người dùng</Title>
      <Text type="secondary">
        Quản lý và cấp quyền (capabilities) cho người dùng trong hệ thống
      </Text>

      <Card style={{ marginTop: 24, marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tên, email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={userTypeFilter}
              onChange={setUserTypeFilter}
              options={[
                { label: "Tất cả loại", value: "all" },
                { label: "Admin", value: "admin" },
                { label: "Company", value: "company" },
                { label: "User", value: "user" },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách người dùng (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng`,
          }}
        />
      </Card>

      {/* Permission Editor Modal */}
      <Modal
        title={
          <Space>
            <UserOutlined />
            <span>Cấp quyền cho: {selectedUser?.name}</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="cancel" icon={<CloseOutlined />} onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="save"
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSavePermissions}
          >
            Lưu quyền
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Text strong>Email:</Text> {selectedUser.email}
              </Col>
              <Col span={12}>
                <Text strong>Vai trò:</Text>{" "}
                {selectedUser.role ? (
                  <Tag>{selectedUser.role}</Tag>
                ) : (
                  <Text type="secondary">Chưa có</Text>
                )}
              </Col>
            </Row>

            <Divider />

            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {Object.entries(capabilityGroups).map(([group, capabilities]) => (
                <div key={group} style={{ marginBottom: 24 }}>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {group}
                  </Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {capabilities.map((cap) => (
                      <Checkbox
                        key={cap.value}
                        checked={selectedCapabilities.includes(cap.value)}
                        onChange={() => toggleCapability(cap.value)}
                      >
                        {cap.label}
                      </Checkbox>
                    ))}
                  </Space>
                  <Divider style={{ margin: "16px 0" }} />
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 16,
                background: "#f5f5f5",
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <Text strong>
                Đã chọn: {selectedCapabilities.length} quyền
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

