# Hệ Thống Y Tế Học Đường

## Cấu trúc thư mục

```
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   │   ├── assets/       # Images, fonts, etc.
│   │   └── index.html    # Main HTML file
│   ├── src/              # React source code
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # Global styles
│   │   └── App.js        # Main React component
│   └── package.json      # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── server.js         # Main server file
│
├── docs/                  # Documentation
│   ├── api/             # API documentation
│   └── setup/           # Setup guides
│
└── scripts/              # Build and deployment scripts
```

## Công nghệ sử dụng

### Frontend

- React 18.x
- Material-UI 5.x
- Chart.js cho biểu đồ
- Axios cho API calls
- React Router cho routing
- Redux Toolkit cho state management

### Backend

- Node.js 18.x
- Express.js
- MongoDB với Mongoose
- JWT cho authentication
- Bcrypt cho password hashing
- Winston cho logging

### Development Tools

- ESLint cho code linting
- Prettier cho code formatting
- Jest cho testing
- Docker cho containerization
- GitHub Actions cho CI/CD

## Cài đặt và Chạy

### Yêu cầu

- Node.js 18.x
- MongoDB 6.x
- npm hoặc yarn

### Cài đặt

1. Clone repository:

```bash
git clone [repository-url]
cd school-health-system
```

2. Cài đặt dependencies:

```bash
# Cài đặt backend dependencies
cd server
npm install

# Cài đặt frontend dependencies
cd ../client
npm install
```

3. Tạo file môi trường:

```bash
# Trong thư mục server
cp .env.example .env
# Chỉnh sửa các biến môi trường trong .env
```

### Chạy ứng dụng

1. Chạy backend:

```bash
cd server
npm run dev
```

2. Chạy frontend:

```bash
cd client
npm start
```

## Tính năng chính

### Authentication & Authorization

- Đăng nhập/Đăng xuất
- Phân quyền người dùng (Admin, Y tá, Phụ huynh)
- Xác thực CCCD cho phụ huynh
- JWT token authentication
- Password reset

### Dashboard

- Admin Dashboard
  - Quản lý tài khoản
  - Thống kê và báo cáo
  - Quản lý thông báo
  - Cài đặt hệ thống
- Parent Dashboard
  - Xem thông tin học sinh
  - Theo dõi sức khỏe
  - Lịch sử khám bệnh
  - Đặt lịch khám

### Quản lý sức khỏe

- Hồ sơ sức khỏe học sinh
- Lịch sử khám bệnh
- Biểu đồ theo dõi
- Thông báo khám định kỳ

### Báo cáo & Thống kê

- Biểu đồ thống kê
- Báo cáo định kỳ
- Xuất dữ liệu
- Phân tích xu hướng

## Bảo mật

- Mã hóa dữ liệu nhạy cảm
- Xác thực 2 lớp
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching
- Database indexing
- API response compression

## Monitoring & Logging

- Error tracking
- Performance monitoring
- User activity logging
- System health checks
- Audit trails

## Contributing

1. Fork repository
2. Tạo branch mới
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License
