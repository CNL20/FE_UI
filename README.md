# Hệ Thống Y Tế Học Đường - Frontend

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
└── docs/                  # Documentation
    └── api/             # API documentation
```

## Công nghệ sử dụng

### Frontend

- React 18.x
- Material-UI 5.x
- Chart.js cho biểu đồ
- Axios cho API calls
- React Router cho routing
- Redux Toolkit cho state management

### Development Tools

- ESLint cho code linting
- Prettier cho code formatting
- Jest cho testing

## Cài đặt và Chạy

### Yêu cầu

- Node.js 18.x
- npm hoặc yarn

### Cài đặt

1. Clone repository:

```bash
git clone [repository-url]
cd school-health-system
```

2. Cài đặt dependencies:

```bash
# Cài đặt frontend dependencies
cd client
npm install
```

### Chạy ứng dụng

```bash
npm start
```

## Tính năng chính

### Authentication & Authorization

- Đăng nhập/Đăng xuất
- Phân quyền người dùng (Admin, Y tá, Phụ huynh)
- Xác thực CCCD cho phụ huynh
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

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching

## Monitoring & Logging

- Error tracking
- Performance monitoring
- User activity logging
