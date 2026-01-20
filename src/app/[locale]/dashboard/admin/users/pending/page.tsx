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
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface PendingUser {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  type: "user" | "company";
  submittedAt: string;
  documents?: string[];
}

const mockPendingUsers: PendingUser[] = [
  {
    key: "1",
    id: 1,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "+84 945 678 901",
    type: "user",
    submittedAt: "2024-01-20",
  },
  {
    key: "2",
    id: 2,
    name: "TechStartup Co.",
    email: "contact@techstartup.com",
    phone: "+84 987 654 321",
    type: "company",
    submittedAt: "2024-01-19",
    documents: ["Giấy phép kinh doanh.pdf", "CMND/CCCD.pdf"],
  },
  {
    key: "3",
    id: 3,
    name: "Nguyễn Văn F",
    email: "nguyenvanf@email.com",
    phone: "+84 912 345 678",
    type: "user",
    submittedAt: "2024-01-18",
  },
];

export default function PendingUsersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns: ColumnsType<PendingUser> = [
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
      title: "Ngày nộp",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Tài liệu",
      key: "documents",
      render: (_, record) => (
        <Space>
          {record.documents && record.documents.length > 0 ? (
            <>
              <FileTextOutlined />
              <span>{record.documents.length} tài liệu</span>
            </>
          ) : (
            <span>-</span>
          )}
        </Space>
      ),
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
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApprove(record.id)}
          >
            Duyệt
          </Button>
          <Button
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleReject(record.id)}
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  const handleApprove = (id: number) => {
    Modal.confirm({
      title: "Xác nhận duyệt",
      content: "Bạn có chắc chắn muốn duyệt người dùng này?",
      onOk: () => {
        message.success("Đã duyệt người dùng thành công");
      },
    });
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

  const filteredData = mockPendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Title level={2}>Người dùng chờ duyệt</Title>

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
          <Col xs={24} sm={12} md={16}>
            <Space>
              <Button type="primary">Duyệt tất cả</Button>
              <Button>Xuất danh sách</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách chờ duyệt (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng chờ duyệt`,
          }}
        />
      </Card>

      <Modal
        title="Chi tiết người dùng"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="reject" danger onClick={() => selectedUser && handleReject(selectedUser.id)}>
            Từ chối
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => selectedUser && handleApprove(selectedUser.id)}
          >
            Duyệt
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
            <Descriptions.Item label="Ngày nộp">
              {dayjs(selectedUser.submittedAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            {selectedUser.documents && selectedUser.documents.length > 0 && (
              <Descriptions.Item label="Tài liệu">
                <Space direction="vertical">
                  {selectedUser.documents.map((doc, index) => (
                    <Button key={index} type="link" icon={<FileTextOutlined />}>
                      {doc}
                    </Button>
                  ))}
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

