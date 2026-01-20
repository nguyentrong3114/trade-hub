# 🔐 Tài Khoản Demo & Hướng Dẫn Test

## 📋 Trạng Thái Tích Hợp

### ✅ Đã Tích Hợp
- **Auth Store (Zustand)**: Quản lý authentication state
- **API Client**: Tự động thêm Authorization headers
- **Protected Routes**: Bảo vệ routes theo userType/role
- **React Query**: Data fetching và caching
- **Admin Dashboard**: Đã tích hợp API thực tế cho stats và users

### ⚠️ Đang Sử Dụng Mock Data
Một số trang vẫn đang dùng mock data:
- Company Dashboard (một số phần)
- Reports pages
- Orders pages (một số)
- Products pages (một số)

**Lý do**: Cần backend API chạy để test đầy đủ.

---

## 🚀 Cách Sử Dụng

### 1. **Backend Phải Chạy**
```bash
# Backend cần chạy tại:
http://localhost:3001
```

### 2. **Cấu Hình Environment**
Tạo file `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 3. **Tài Khoản Demo (Cần Backend Cung Cấp)**

#### **Admin Account**
```
Email: admin@b2b.com
Password: [cần backend cung cấp]
UserType: admin
Role: super_admin
```

#### **Company Account**
```
Email: company@example.com
Password: [cần backend cung cấp]
UserType: business
Role: company_owner
```

#### **User Account**
```
Email: user@example.com
Password: [cần backend cung cấp]
UserType: user
Role: customer
```

---

## 🧪 Test Flow

### 1. **Test Admin Dashboard**
1. Login với admin account
2. Vào `/vi/dashboard/admin`
3. Kiểm tra:
   - Stats cards hiển thị từ API
   - Users table hiển thị từ API
   - Charts hoạt động

### 2. **Test Company Dashboard**
1. Login với company account
2. Vào `/vi/dashboard/company`
3. Kiểm tra:
   - Company info hiển thị đúng
   - Menu items hiển thị theo permissions

### 3. **Test Protected Routes**
1. Thử truy cập `/dashboard/admin` khi chưa login → Redirect về login
2. Login với user account → Không thể vào admin dashboard
3. Login với company account → Không thể vào admin dashboard

---

## 🔍 Kiểm Tra Tích Hợp

### API Endpoints Cần Có:

#### Authentication
- `POST /api/auth/login` ✅
- `GET /api/auth/me` (chưa tích hợp)

#### Admin APIs
- `GET /api/admin/dashboard/stats` ✅
- `GET /api/admin/companies` ✅
- `GET /api/admin/users` ✅
- `PUT /api/admin/companies/:id/suspend` ✅
- `PUT /api/admin/companies/:id/activate` ✅

#### Company APIs (cần tích hợp)
- `GET /api/company/dashboard/stats`
- `GET /api/company/products`
- `GET /api/company/orders`
- `GET /api/employees`

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to server"
- Kiểm tra backend có chạy không
- Kiểm tra `NEXT_PUBLIC_BACKEND_URL` trong `.env.local`

### Lỗi: 401 Unauthorized
- Token hết hạn → Logout và login lại
- Kiểm tra token có được lưu trong localStorage không

### Lỗi: Stats không hiển thị
- Kiểm tra API response format có đúng không
- Xem console để check error
- Có thể backend chưa implement endpoint này

---

## 📝 Notes

- **Mock Data**: Một số trang vẫn dùng mock data để UI có thể test ngay
- **API Integration**: Admin dashboard đã tích hợp đầy đủ
- **Company Dashboard**: Cần tích hợp thêm API endpoints

---

## 🎯 Next Steps

1. ✅ Hoàn thành tích hợp Admin APIs
2. ⏳ Tích hợp Company APIs
3. ⏳ Tích hợp User APIs
4. ⏳ Thêm error boundaries
5. ⏳ Thêm loading skeletons tốt hơn

---

**Lưu ý**: Tài khoản demo cần được tạo từ backend. Frontend chỉ xử lý authentication flow và hiển thị dữ liệu từ API.

