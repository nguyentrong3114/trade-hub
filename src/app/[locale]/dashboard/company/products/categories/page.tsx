"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Typography,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FolderOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Category {
  key: string;
  id: string;
  name: string;
  slug: string;
  productCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

const mockCategories: Category[] = [
  { key: "1", id: "CAT001", name: "Điện thoại", slug: "dien-thoai", productCount: 45, status: "active", createdAt: "2024-01-01" },
  { key: "2", id: "CAT002", name: "Laptop", slug: "laptop", productCount: 32, status: "active", createdAt: "2024-01-01" },
  { key: "3", id: "CAT003", name: "Tablet", slug: "tablet", productCount: 18, status: "active", createdAt: "2024-01-01" },
  { key: "4", id: "CAT004", name: "Phụ kiện", slug: "phu-kien", productCount: 120, status: "active", createdAt: "2024-01-01" },
  { key: "5", id: "CAT005", name: "Đồng hồ", slug: "dong-ho", productCount: 25, status: "inactive", createdAt: "2024-01-01" },
];

export default function CategoriesPage() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    message.success(`Đã xóa danh mục ${id}`);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log("Category data:", values);
    message.success(editingCategory ? "Cập nhật danh mục thành công!" : "Thêm danh mục thành công!");
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: TableProps<Category>["columns"] = [
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Space>
          <FolderOutlined style={{ color: "#10b981" }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productCount",
      key: "productCount",
      sorter: (a, b) => a.productCount - b.productCount,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status === "active" ? "Hoạt động" : "Tạm ngưng"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredCategories = mockCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Danh mục sản phẩm</Title>
          <Text type="secondary">Quản lý danh mục sản phẩm của cửa hàng</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm danh mục
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm danh mục..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCategories}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={editingCategory ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Vui lòng nhập slug" }]}
          >
            <Input placeholder="ten-danh-muc" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

