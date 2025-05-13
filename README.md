# CMS Mini - Hệ Thống Quản Lý Nội Dung

CMS Mini là một hệ thống quản lý nội dung đơn giản được xây dựng với kiến trúc phân tách giữa Backend và Frontend.

## Cấu Trúc Dự Án

Dự án được chia thành hai phần chính:

```
CMS_mini/
├── BE/                 # Backend
│   ├── controllers/    # Xử lý logic nghiệp vụ
│   ├── middlewares/    # Middleware xác thực và xử lý request
│   ├── models/         # Mô hình dữ liệu MongoDB
│   ├── routes/         # Định nghĩa API endpoints
│   ├── uploads/        # Thư mục lưu trữ file upload
│   ├── index.js        # Điểm khởi đầu ứng dụng Backend
│   └── package.json    # Cấu hình và dependencies Backend
│
└── FE/                 # Frontend
    └── package.json    # Cấu hình và dependencies Frontend
```

## Công Nghệ Sử Dụng

### Backend (BE)

- **Node.js** với **Express** framework
- **MongoDB** với **Mongoose** ORM
- **JWT** (JSON Web Token) cho xác thực
- **Bcrypt** để mã hóa mật khẩu
- **Multer** để xử lý upload file
- **Cloudinary** để lưu trữ và quản lý hình ảnh
- **Slugify** để tạo URL thân thiện

### Frontend (FE)

- **React** với **React Router** cho điều hướng
- **Axios** để gọi API
- **React Quill** cho trình soạn thảo văn bản phong phú
- **Slugify** để tạo URL thân thiện

## Cài Đặt và Chạy Dự Án

### Yêu Cầu Hệ Thống

- Node.js (phiên bản 14.x trở lên)
- MongoDB (phiên bản 4.x trở lên)

### Cài Đặt Backend

```bash
cd BE
npm install
```

### Cài Đặt Frontend

```bash
cd FE
npm install
```

### Chạy Backend

```bash
cd BE
npm run dev  # Chạy với nodemon (phát triển)
# hoặc
npm start    # Chạy với node
```

### Chạy Frontend

```bash
cd FE
npm start
```

## Tính Năng Chính

1. **Quản lý người dùng**

   - Đăng ký, đăng nhập, quản lý thông tin cá nhân
   - Phân quyền người dùng (Admin, Editor, User)

2. **Quản lý nội dung**

   - Tạo, chỉnh sửa, xóa bài viết
   - Hỗ trợ trình soạn thảo văn bản phong phú
   - Upload và quản lý hình ảnh

3. **Phân loại và tìm kiếm**

   - Phân loại bài viết theo danh mục
   - Tìm kiếm bài viết

4. **Quản lý file**
   - Upload và quản lý file
   - Tích hợp với Cloudinary để lưu trữ hình ảnh

## Cấu Hình Môi Trường

### Backend (.env)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cms_mini
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3000/api
```

## Đóng Góp

Võ Duy Bảo Khánh

Nếu bạn muốn đóng góp vào dự án, vui lòng tạo một pull request hoặc báo cáo các vấn đề tại mục Issues.

## Giấy Phép

Dự án này được phân phối dưới giấy phép MIT.
