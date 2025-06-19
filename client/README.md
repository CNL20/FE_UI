# School Health Management System - Frontend

## Cấu hình cho Backend

### 1. Environment Variables

Tạo file `.env` trong thư mục `client/` với nội dung sau:

```env
# API Configuration
REACT_APP_API_BASE_URL=https://localhost:5001/api

# JWT Configuration
REACT_APP_JWT_ISSUER=school-heath-api

# Development Configuration
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
```

### 2. Backend Configuration

Đảm bảo backend của bạn có các cấu hình sau trong `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "chuyenhaikhonghaivinokhonghehaitinao",
    "Issuer": "school-heath-api"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=SchoolHealthDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. CORS Configuration

Backend cần cấu hình CORS để cho phép frontend truy cập:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});
```

### 4. API Endpoints

Frontend đã được cấu hình để gọi các endpoints sau:

- **Authentication:**
  - `POST /api/auth/login` - Đăng nhập
  - `POST /api/auth/register` - Đăng ký
  - `POST /api/auth/logout` - Đăng xuất
  - `POST /api/auth/refresh-token` - Refresh token
  - `POST /api/auth/google-login` - Google OAuth
  - `GET /signin-google` - Google OAuth redirect

- **Users:**
  - `GET /api/users/profile` - Lấy thông tin user
  - `PUT /api/users/change-password` - Đổi mật khẩu

- **Health Records:**
  - `GET /api/health-records/student/{id}` - Lấy hồ sơ sức khỏe

- **Events:**
  - `GET /api/events/upcoming` - Lấy sự kiện sắp tới
  - `GET /api/events/past` - Lấy sự kiện đã qua

### 5. Chạy ứng dụng

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### 6. Lưu ý bảo mật

- JWT Key nên được lưu trữ an toàn trên backend
- Sử dụng HTTPS trong production
- Validate tất cả input từ user

### 7. Troubleshooting

Nếu gặp lỗi CORS:
1. Kiểm tra backend có chạy trên port 5001 không
2. Đảm bảo CORS policy đã được cấu hình đúng
3. Kiểm tra SSL certificate nếu sử dụng HTTPS

Nếu gặp lỗi authentication:
1. Kiểm tra JWT configuration
2. Kiểm tra database connection 