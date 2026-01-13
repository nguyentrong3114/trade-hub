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

interface BlogCategory {
  key: string;
  id: string;
  name: string;
  slug: string;
  postCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

const mockCategories: BlogCategory[] = [
  { key: "1", id: "CAT001", name: "Công nghệ", slug: "cong-nghe", postCount: 25, status: "active", createdAt: "2024-01-01" },
  { key: "2", id: "CAT002", name: "Hướng dẫn", slug: "huong-dan", postCount: 18, status: "active", createdAt: "2024-01-01" },
  { key: "3", id: "CAT003", name: "Tin tức", slug: "tin-tuc", postCount: 32, status: "active", createdAt: "2024-01-01" },
  { key: "4", id: "CAT004", name: "Sự kiện", slug: "su-kien", postCount: 12, status: "active", createdAt: "2024-01-01" },
  { key: "5", id: "CAT005", name: "Sản phẩm", slug: "san-pham", postCount: 8, status: "inactive", createdAt: "2024-01-01" },
];

export default function BlogCategoriesPage() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (category: BlogCategory) => {
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

  const columns: TableProps<BlogCategory>["columns"] = [
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
      title: "Số bài viết",
      dataIndex: "postCount",
      key: "postCount",
      sorter: (a, b) => a.postCount - b.postCount,
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
          <Title level={4} style={{ margin: 0 }}>Danh mục Blog</Title>
          <Text type="secondary">Quản lý danh mục bài viết</Text>
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

