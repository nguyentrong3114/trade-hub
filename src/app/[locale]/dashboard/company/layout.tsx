"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ConfigProvider, Layout, Menu, Avatar, Dropdown, Badge, Button, theme, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { useAuthStore } from "@/stores/authStore";
// TODO: Uncomment khi có authentication thực tế
// import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  HomeOutlined,
  ShopOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
  PlusCircleOutlined,
  EditOutlined,
  CustomerServiceOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  PlayCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const { Header, Sider, Content } = Layout;

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;
  const { user, logout } = useAuthStore();
  
  // TODO: Xóa khi có authentication thực tế
  // Mock user để hiển thị UI khi chưa login
  const displayUser = user || {
    fullName: "Company Owner",
    companyName: "TechCorp",
    email: "company@example.com",
    userType: "business" as const,
    role: "company_owner",
  };

  // Start guided tour
  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      stagePadding: 10,
      popoverClass: "company-tour-popover",
      nextBtnText: "Tiếp theo →",
      prevBtnText: "← Quay lại",
      doneBtnText: "Hoàn thành ✓",
      progressText: "{{current}} / {{total}}",
      steps: [
        {
          element: "#sidebar-menu",
          popover: {
            title: "📋 Menu điều hướng",
            description: "Đây là menu chính để điều hướng giữa các trang quản lý. Bao gồm: Tổng quan, Sản phẩm, Đơn hàng, Khách hàng, Tài chính, Blog, Docs và nhiều hơn nữa.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#header-actions",
          popover: {
            title: "⚡ Thao tác nhanh",
            description: "Các nút thao tác nhanh: Thêm sản phẩm, về trang chủ, thông báo và menu người dùng.",
            side: "bottom",
            align: "end",
          },
        },
        {
          element: "#tour-button",
          popover: {
            title: "🎯 Hướng dẫn sử dụng",
            description: "Nhấn vào đây bất cứ lúc nào để xem lại hướng dẫn này hoặc truy cập tài liệu chi tiết.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#add-product-btn",
          popover: {
            title: "➕ Thêm sản phẩm",
            description: "Nhấn để thêm sản phẩm mới vào cửa hàng của bạn một cách nhanh chóng.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#notification-btn",
          popover: {
            title: "🔔 Thông báo",
            description: "Xem các thông báo mới về đơn hàng, khách hàng và hệ thống.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#user-menu",
          popover: {
            title: "👤 Tài khoản",
            description: "Quản lý hồ sơ công ty, cài đặt và đăng xuất từ menu này.",
            side: "bottom",
            align: "end",
          },
        },
        {
          popover: {
            title: "🎉 Hoàn thành!",
            description: "Bạn đã hoàn thành tour hướng dẫn cơ bản. Khám phá thêm trong mục Docs để tìm hiểu chi tiết về từng tính năng!",
          },
        },
      ],
    });

    driverObj.drive();
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <Link href={`/${locale}/dashboard/company`}>Tổng quan</Link>,
    },
    {
      key: "profile",
      icon: <ShopOutlined />,
      label: <Link href={`/${locale}/dashboard/company/profile`}>Hồ sơ công ty</Link>,
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Sản phẩm",
      children: [
        { key: "products-all", label: <Link href={`/${locale}/dashboard/company/products`}>Tất cả</Link> },
        { key: "products-add", label: <Link href={`/${locale}/dashboard/company/products/add`}>Thêm mới</Link> },
        { key: "products-categories", label: <Link href={`/${locale}/dashboard/company/products/categories`}>Danh mục</Link> },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Đơn hàng",
      children: [
        { key: "orders-all", label: <Link href={`/${locale}/dashboard/company/orders`}>Tất cả</Link> },
        { key: "orders-pending", label: <Link href={`/${locale}/dashboard/company/orders/pending`}>Chờ xử lý</Link> },
        { key: "orders-shipping", label: <Link href={`/${locale}/dashboard/company/orders/shipping`}>Đang giao</Link> },
      ],
    },
    {
      key: "customers",
      icon: <TeamOutlined />,
      label: <Link href={`/${locale}/dashboard/company/customers`}>Khách hàng</Link>,
    },
    {
      key: "finance",
      icon: <DollarOutlined />,
      label: "Tài chính",
      children: [
        { key: "finance-revenue", label: <Link href={`/${locale}/dashboard/company/finance/revenue`}>Doanh thu</Link> },
        { key: "finance-transactions", label: <Link href={`/${locale}/dashboard/company/finance/transactions`}>Giao dịch</Link> },
        { key: "finance-withdraw", label: <Link href={`/${locale}/dashboard/company/finance/withdraw`}>Rút tiền</Link> },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: <Link href={`/${locale}/dashboard/company/reports`}>Báo cáo</Link>,
    },
    {
      key: "blog",
      icon: <EditOutlined />,
      label: "Blog",
      children: [
        { key: "blog-all", label: <Link href={`/${locale}/dashboard/company/blog`}>Tất cả bài viết</Link> },
        { key: "blog-add", label: <Link href={`/${locale}/dashboard/company/blog/add`}>Viết bài mới</Link> },
        { key: "blog-categories", label: <Link href={`/${locale}/dashboard/company/blog/categories`}>Danh mục</Link> },
      ],
    },
    { type: "divider" },
    {
      key: "docs",
      icon: <BookOutlined />,
      label: "Tài liệu",
      children: [
        { key: "docs-getting-started", label: <Link href={`/${locale}/dashboard/company/docs`}>Bắt đầu</Link> },
        { key: "docs-products", label: <Link href={`/${locale}/dashboard/company/docs/products`}>Quản lý sản phẩm</Link> },
        { key: "docs-orders", label: <Link href={`/${locale}/dashboard/company/docs/orders`}>Quản lý đơn hàng</Link> },
        { key: "docs-api", label: <Link href={`/${locale}/dashboard/company/docs/api`}>API Reference</Link> },
        { key: "docs-faq", label: <Link href={`/${locale}/dashboard/company/docs/faq`}>FAQ</Link> },
      ],
    },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: <Link href={`/${locale}/dashboard/company/support`}>Hỗ trợ</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link href={`/${locale}/dashboard/company/settings`}>Cài đặt</Link>,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/auth/login`);
  };

  const userMenuItems: MenuProps["items"] = [
    { key: "profile", icon: <ShopOutlined />, label: "Hồ sơ công ty" },
    { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  const helpMenuItems: MenuProps["items"] = [
    {
      key: "tour",
      icon: <PlayCircleOutlined />,
      label: "Hướng dẫn tương tác",
      onClick: startTour,
    },
    { type: "divider" },
    {
      key: "docs",
      icon: <BookOutlined />,
      label: <Link href={`/${locale}/dashboard/company/docs`}>Tài liệu hướng dẫn</Link>,
    },
    {
      key: "api",
      icon: <FileTextOutlined />,
      label: <Link href={`/${locale}/dashboard/company/docs/api`}>API Reference</Link>,
    },
    {
      key: "faq",
      icon: <QuestionCircleOutlined />,
      label: <Link href={`/${locale}/dashboard/company/docs/faq`}>Câu hỏi thường gặp</Link>,
    },
    { type: "divider" },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: <Link href={`/${locale}/dashboard/company/support`}>Liên hệ hỗ trợ</Link>,
    },
  ];

  // TODO: Uncomment khi có authentication thực tế
  // return (
  //   <ProtectedRoute requiredUserType="business">
  //     <ConfigProvider
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#10b981",
            borderRadius: 8,
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={260}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#fff",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? 0 : "0 24px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Avatar size={40} style={{ backgroundColor: "#10b981" }}>
              {displayUser?.companyName?.charAt(0) || displayUser?.fullName?.charAt(0) || "C"}
            </Avatar>
            {!collapsed && (
              <span style={{ marginLeft: 12, fontSize: 16, fontWeight: 600 }}>
                {displayUser?.companyName || displayUser?.fullName || "Company"}
              </span>
            )}
          </div>

          {/* Menu */}
          <div id="sidebar-menu">
            <Menu
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              items={menuItems}
              style={{ borderRight: 0 }}
            />
          </div>
        </Sider>

        {/* Main Layout */}
        <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: "all 0.2s" }}>
          {/* Header */}
          <Header
            style={{
              padding: "0 24px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <span style={{ fontSize: 16, fontWeight: 600 }}>
                Company Dashboard
              </span>
            </div>

            <div id="header-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Tour/Help Button */}
              <Dropdown menu={{ items: helpMenuItems }} placement="bottomRight" arrow>
                <Button id="tour-button" icon={<QuestionCircleOutlined />}>
                  Hướng dẫn
                </Button>
              </Dropdown>

              <Button id="add-product-btn" type="primary" icon={<PlusCircleOutlined />}>
                Thêm sản phẩm
              </Button>

              <Link href={`/${locale}`}>
                <Button icon={<GlobalOutlined />}>Về trang chủ</Button>
              </Link>

              <Badge count={8} size="small">
                <Button id="notification-btn" type="text" icon={<BellOutlined style={{ fontSize: 20 }} />} />
              </Badge>

              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <Avatar style={{ backgroundColor: "#10b981" }}>
                    {displayUser?.companyName?.charAt(0) || displayUser?.fullName?.charAt(0) || "C"}
                  </Avatar>
                  <span style={{ fontWeight: 500 }}>{displayUser?.companyName || displayUser?.fullName || "Company"}</span>
                </div>
              </Dropdown>
            </div>
          </Header>

          {/* Content */}
          <Content
            style={{
              margin: 24,
              minHeight: "calc(100vh - 64px - 48px)",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>

      {/* Custom styles for driver.js */}
      <style jsx global>{`
        .driver-popover {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        
        .driver-popover-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .driver-popover-description {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .driver-popover-progress-text {
          color: #10b981;
          font-weight: 500;
        }
        
        .driver-popover-prev-btn,
        .driver-popover-next-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .driver-popover-prev-btn:hover,
        .driver-popover-next-btn:hover {
          background: #059669;
        }
        
        .driver-popover-prev-btn {
          background: #f3f4f6;
          color: #374151;
        }
        
        .driver-popover-prev-btn:hover {
          background: #e5e7eb;
        }
        
        .driver-popover-close-btn {
          color: #9ca3af;
        }
        
        .driver-popover-close-btn:hover {
          color: #374151;
        }
        
        .driver-popover-arrow {
          border-color: #fff;
        }
      `}</style>
    </ConfigProvider>
    // </ProtectedRoute>
    // );
  );
}
