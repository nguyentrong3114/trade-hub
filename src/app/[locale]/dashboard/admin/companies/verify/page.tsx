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
  Tabs,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface VerifyCompany {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  submittedAt: string;
  documents: string[];
  businessLicense?: string;
  taxCode?: string;
}

const mockVerifyCompanies: VerifyCompany[] = [
  {
    key: "1",
    id: 1,
    name: "NewStartup Inc",
    email: "contact@newstartup.com",
    phone: "+84 91 234 5678",
    category: "Công nghệ",
    submittedAt: "2024-01-20",
    documents: ["Giấy phép kinh doanh.pdf", "CMND Giám đốc.pdf", "Giấy chứng nhận đăng ký thuế.pdf"],
    businessLicense: "0123456789",
    taxCode: "0123456789-001",
  },
  {
    key: "2",
    id: 2,
    name: "TradeGlobal Co.",
    email: "info@tradeglobal.com",
    phone: "+84 92 345 6789",
    category: "Thương mại",
    submittedAt: "2024-01-19",
    documents: ["Giấy phép kinh doanh.pdf", "CMND Giám đốc.pdf"],
    businessLicense: "9876543210",
    taxCode: "9876543210-001",
  },
];

export default function VerifyCompaniesPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<VerifyCompany | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns: ColumnsType<VerifyCompany> = [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#10b981" }} icon={<ShopOutlined />} />
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
      title: "Ngành",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag>{category}</Tag>,
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
          <FileTextOutlined />
          <span>{record.documents.length} tài liệu</span>
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
              setSelectedCompany(record);
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
            Xác minh
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
      title: "Xác nhận xác minh",
      content: "Bạn có chắc chắn muốn xác minh company này?",
      onOk: () => {
        message.success("Đã xác minh company thành công");
      },
    });
  };

  const handleReject = (id: number) => {
    Modal.confirm({
      title: "Xác nhận từ chối",
      content: "Bạn có chắc chắn muốn từ chối xác minh company này?",
      okButtonProps: { danger: true },
      onOk: () => {
        message.success("Đã từ chối xác minh");
      },
    });
  };

  const filteredData = mockVerifyCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Title level={2}>Xác minh Company</Title>

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
              <Button type="primary">Xác minh tất cả</Button>
              <Button>Xuất danh sách</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách chờ xác minh (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} company chờ xác minh`,
          }}
        />
      </Card>

      <Modal
        title="Chi tiết xác minh Company"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="reject" danger onClick={() => selectedCompany && handleReject(selectedCompany.id)}>
            Từ chối
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => selectedCompany && handleApprove(selectedCompany.id)}
          >
            Xác minh
          </Button>,
        ]}
        width={700}
      >
        {selectedCompany && (
          <Tabs
            items={[
              {
                key: "info",
                label: "Thông tin",
                children: (
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Tên công ty">{selectedCompany.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedCompany.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{selectedCompany.phone}</Descriptions.Item>
                    <Descriptions.Item label="Ngành">
                      <Tag>{selectedCompany.category}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã số thuế">
                      {selectedCompany.taxCode || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giấy phép kinh doanh">
                      {selectedCompany.businessLicense || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày nộp">
                      {dayjs(selectedCompany.submittedAt).format("DD/MM/YYYY HH:mm")}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: "documents",
                label: "Tài liệu",
                children: (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {selectedCompany.documents.map((doc, index) => (
                      <Card key={index} size="small">
                        <Space>
                          <FileTextOutlined />
                          <Button type="link">{doc}</Button>
                        </Space>
                      </Card>
                    ))}
                  </Space>
                ),
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
}

