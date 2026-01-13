"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Select,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Switch,
  Space,
  DatePicker,
} from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
  EyeOutlined,
  SendOutlined,
} from "@ant-design/icons";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #d9d9d9", borderRadius: 8, background: "#fafafa" }}>
      Đang tải...
    </div>
  ),
});

// Import Quill styles
import "react-quill-new/dist/quill.snow.css";

const { Title, Text } = Typography;
const { Dragger } = Upload;

// Title toolbar - minimal (just basic formatting)
const titleToolbar = [
  ["bold", "italic", "underline"],
  [{ color: [] }],
  ["clean"],
];

// Excerpt toolbar - simple (basic + alignment)
const excerptToolbar = [
  ["bold", "italic", "underline"],
  [{ color: [] }],
  [{ align: [] }],
  ["link"],
  ["clean"],
];

// Content toolbar - full features
const contentToolbar = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
  ["blockquote", "code-block"],
  ["clean"],
];

const titleFormats = ["bold", "italic", "underline", "color"];
const excerptFormats = ["bold", "italic", "underline", "color", "align", "link"];
const contentFormats = [
  "header", "bold", "italic", "underline", "strike",
  "color", "background", "list", "bullet", "align",
  "link", "image", "blockquote", "code-block",
];

export default function AddBlogPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const [titleContent, setTitleContent] = useState("");
  const [excerptContent, setExcerptContent] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Modules for each editor
  const titleModules = useMemo(() => ({
    toolbar: titleToolbar,
    clipboard: { matchVisual: false },
  }), []);

  const excerptModules = useMemo(() => ({
    toolbar: excerptToolbar,
    clipboard: { matchVisual: false },
  }), []);

  const contentModules = useMemo(() => ({
    toolbar: contentToolbar,
    clipboard: { matchVisual: false },
  }), []);

  // Handle content change
  const handleMainContentChange = useCallback((value: string) => {
    setMainContent(value);
    const text = value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, []);

  const handleSubmit = async () => {
    if (!titleContent || titleContent === "<p><br></p>") {
      message.error("Vui lòng nhập tiêu đề!");
      return;
    }
    if (!mainContent || mainContent === "<p><br></p>") {
      message.error("Vui lòng nhập nội dung bài viết!");
      return;
    }
    
    setLoading(true);
    const values = form.getFieldsValue();
    const blogData = {
      ...values,
      title: titleContent,
      excerpt: excerptContent,
      content: mainContent,
    };
    console.log("Blog data:", blogData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    message.success("Đã lưu bài viết thành công!");
    setLoading(false);
    router.push(`/${locale}/dashboard/company/blog`);
  };

  const handleSaveDraft = async () => {
    const values = form.getFieldsValue();
    const draftData = {
      ...values,
      title: titleContent,
      excerpt: excerptContent,
      content: mainContent,
      status: "draft",
    };
    console.log("Draft:", draftData);
    message.success("Đã lưu bản nháp!");
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      const titleText = titleContent.replace(/<[^>]*>/g, "") || "Tiêu đề bài viết";
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Xem trước: ${titleText}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #333; }
            .title { font-size: 2.2em; margin-bottom: 0.5em; }
            .excerpt { color: #666; font-size: 1.1em; margin-bottom: 2em; padding-bottom: 1em; border-bottom: 1px solid #eee; }
            img { max-width: 100%; border-radius: 8px; }
            blockquote { border-left: 4px solid #10b981; margin: 1em 0; padding: 0.5em 1em; background: #f9fafb; }
            pre { background: #1f2937; color: #e5e7eb; padding: 1em; border-radius: 8px; }
            a { color: #10b981; }
          </style>
        </head>
        <body>
          <div class="title">${titleContent || "Tiêu đề bài viết"}</div>
          <div class="excerpt">${excerptContent || "Mô tả ngắn..."}</div>
          ${mainContent || "<p>Nội dung bài viết...</p>"}
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()} style={{ marginBottom: 16 }}>
          Quay lại
        </Button>
        <Title level={4} style={{ margin: 0 }}>Viết bài mới</Title>
        <Text type="secondary">Tạo bài viết mới cho blog công ty</Text>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Nội dung bài viết" style={{ marginBottom: 24 }}>
              {/* Title Editor */}
              <Form.Item label="Tiêu đề" required>
                <div className="title-editor">
                  <ReactQuill
                    theme="snow"
                    value={titleContent}
                    onChange={setTitleContent}
                    modules={titleModules}
                    formats={titleFormats}
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Công cụ: In đậm, In nghiêng, Gạch chân, Màu chữ
                </Text>
              </Form.Item>

              {/* Excerpt Editor */}
              <Form.Item label="Mô tả ngắn" required>
                <div className="excerpt-editor">
                  <ReactQuill
                    theme="snow"
                    value={excerptContent}
                    onChange={setExcerptContent}
                    modules={excerptModules}
                    formats={excerptFormats}
                    placeholder="Mô tả ngắn gọn về bài viết..."
                  />
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Công cụ: In đậm, In nghiêng, Gạch chân, Màu chữ, Căn lề, Chèn link
                </Text>
              </Form.Item>

              {/* Main Content Editor */}
              <Form.Item label="Nội dung chính" required>
                <div className="content-editor">
                  <ReactQuill
                    theme="snow"
                    value={mainContent}
                    onChange={handleMainContentChange}
                    modules={contentModules}
                    formats={contentFormats}
                    placeholder="Viết nội dung bài viết của bạn..."
                  />
                </div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Công cụ: Heading, Định dạng, Màu sắc, Danh sách, Căn lề, Link, Ảnh, Quote, Code
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    <strong>{wordCount}</strong> từ
                  </Text>
                </div>
              </Form.Item>
            </Card>

            <Card title="Hình ảnh đại diện" style={{ marginBottom: 24 }}>
              <Form.Item name="thumbnail">
                <Dragger accept="image/*" beforeUpload={() => false} maxCount={1}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">Kéo thả hoặc click để tải ảnh</p>
                  <p className="ant-upload-hint">Kích thước khuyến nghị: 1200x630px</p>
                </Dragger>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Phân loại" style={{ marginBottom: 24 }}>
              <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}>
                <Select
                  placeholder="Chọn danh mục"
                  options={[
                    { value: "cong-nghe", label: "Công nghệ" },
                    { value: "huong-dan", label: "Hướng dẫn" },
                    { value: "tin-tuc", label: "Tin tức" },
                    { value: "su-kien", label: "Sự kiện" },
                    { value: "san-pham", label: "Sản phẩm" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Nhập tags"
                  options={[
                    { value: "trending", label: "Trending" },
                    { value: "hot", label: "Hot" },
                    { value: "moi", label: "Mới" },
                  ]}
                />
              </Form.Item>
            </Card>

            <Card title="Xuất bản" style={{ marginBottom: 24 }}>
              <Form.Item label="Lên lịch đăng" name="scheduledAt" extra="Để trống nếu muốn đăng ngay">
                <DatePicker showTime style={{ width: "100%" }} placeholder="Chọn thời gian" />
              </Form.Item>

              <Form.Item label="Cho phép bình luận" name="allowComments" valuePropName="checked" initialValue={true}>
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>

              <Form.Item label="Bài viết nổi bật" name="isFeatured" valuePropName="checked">
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>
            </Card>

            <Card title="SEO">
              <Form.Item label="Meta Title" name="metaTitle">
                <Input placeholder="Tiêu đề SEO" />
              </Form.Item>

              <Form.Item label="Meta Description" name="metaDescription">
                <Input.TextArea rows={3} placeholder="Mô tả SEO" />
              </Form.Item>

              <Form.Item label="Slug" name="slug">
                <Input placeholder="duong-dan-bai-viet" addonBefore="/" />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => router.back()}>Hủy</Button>
          <Space>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>Xem trước</Button>
            <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>Lưu bản nháp</Button>
            <Button type="primary" icon={<SendOutlined />} loading={loading} onClick={handleSubmit}>Đăng bài</Button>
          </Space>
        </div>
      </Form>

      {/* Custom styles */}
      <style jsx global>{`
        /* Title Editor - Compact */
        .title-editor .ql-container { font-size: 20px; font-weight: 600; }
        .title-editor .ql-editor { min-height: 50px; padding: 12px; }
        .title-editor .ql-toolbar { padding: 6px 8px; background: #fafafa; border-radius: 8px 8px 0 0; }
        .title-editor .ql-container { border-radius: 0 0 8px 8px; }
        .title-editor .ql-editor.ql-blank::before { font-style: normal; color: #bfbfbf; }
        
        /* Excerpt Editor - Medium */
        .excerpt-editor .ql-container { font-size: 15px; }
        .excerpt-editor .ql-editor { min-height: 80px; padding: 12px; line-height: 1.6; }
        .excerpt-editor .ql-toolbar { padding: 6px 8px; background: #fafafa; border-radius: 8px 8px 0 0; }
        .excerpt-editor .ql-container { border-radius: 0 0 8px 8px; }
        .excerpt-editor .ql-editor.ql-blank::before { font-style: normal; color: #bfbfbf; }
        
        /* Content Editor - Full */
        .content-editor .ql-container { font-size: 16px; }
        .content-editor .ql-editor { min-height: 300px; padding: 16px; line-height: 1.8; }
        .content-editor .ql-toolbar { padding: 8px; background: #fafafa; border-radius: 8px 8px 0 0; }
        .content-editor .ql-container { border-radius: 0 0 8px 8px; }
        .content-editor .ql-editor.ql-blank::before { font-style: normal; color: #bfbfbf; }
        
        /* Common styles */
        .title-editor .ql-toolbar,
        .excerpt-editor .ql-toolbar,
        .content-editor .ql-toolbar { border-color: #d9d9d9; }
        
        .title-editor .ql-container,
        .excerpt-editor .ql-container,
        .content-editor .ql-container { border-color: #d9d9d9; }
        
        /* Active button color */
        .ql-toolbar button:hover,
        .ql-toolbar button.ql-active,
        .ql-toolbar .ql-picker-label:hover,
        .ql-toolbar .ql-picker-item:hover { color: #10b981 !important; }
        
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke { stroke: #10b981 !important; }
        
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button.ql-active .ql-fill { fill: #10b981 !important; }
        
        /* Blockquote */
        .ql-editor blockquote {
          border-left: 4px solid #10b981;
          padding: 8px 16px;
          background: #f0fdf4;
          margin: 12px 0;
          border-radius: 0 8px 8px 0;
        }
        
        /* Code block */
        .ql-editor pre.ql-syntax {
          background: #1f2937;
          color: #e5e7eb;
          padding: 12px;
          border-radius: 8px;
        }
        
        /* Links */
        .ql-editor a { color: #10b981; }
        
        /* Images */
        .ql-editor img { max-width: 100%; border-radius: 8px; margin: 8px 0; }
      `}</style>
    </div>
  );
}
