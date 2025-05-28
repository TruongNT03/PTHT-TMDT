## 🛒 Shop thời trang
![image](https://github.com/user-attachments/assets/d1e1a414-2203-495c-9c80-7cbdbcc2b996)
## 🧾 Mô tả tổng quan

Đây là hệ thống backend cho một website thương mại điện tử bao gồm các chức năng quản lý người dùng, sản phẩm, biến thể sản phẩm, giỏ hàng, đơn hàng, đánh giá và địa chỉ giao hàng. Dữ liệu được tổ chức rõ ràng theo mô hình quan hệ và hỗ trợ các thao tác như mua hàng, quản lý tồn kho, và xử lý thanh toán.

# Giao diện đăng nhập/đăng ký
![image](https://github.com/user-attachments/assets/1a8d94f7-6674-4eab-9e52-1a75e81b420a)

![image](https://github.com/user-attachments/assets/c7f99ee2-1347-4acc-9842-7c2e3d60fe01)

# Giao diện chi tiết sản phẩm/tìm kiếm sản phẩm
![image](https://github.com/user-attachments/assets/8a5cb9c6-39ae-4d5c-aa41-e46b242a6144)

# Giao diện giỏ hàng/thanh toán
![image](https://github.com/user-attachments/assets/36a2b37c-34aa-4ae9-8ab5-48a31d93525a)

![image](https://github.com/user-attachments/assets/6c1e28fa-6225-4801-aebd-3bbcbe1a1667)

# Giao diện thông tin cá nhân
![image](https://github.com/user-attachments/assets/5a2487f5-a024-476e-983d-970cbcdd801f)

# Giao diện admin
![image](https://github.com/user-attachments/assets/e3e0d410-b436-4fcc-a11c-6e72ee30b077)

![image](https://github.com/user-attachments/assets/7ad4e267-7eb2-4700-ac54-aeb72e14ab9a)

![image](https://github.com/user-attachments/assets/9428b685-f68c-472c-b9af-8032ddca6321)

![image](https://github.com/user-attachments/assets/09bfb62a-ee80-4507-a5eb-5152df30a1f3)

![image](https://github.com/user-attachments/assets/b0c13177-8536-41a5-a57a-69048addbae7)

![image](https://github.com/user-attachments/assets/e9e7acc0-8f2d-482b-bbe6-23d75cb1b8e4)

---

## 🗃️ Mô hình cơ sở dữ liệu

![alt text](image.png)

---

## 🔍 Các bảng chính

### 1. **Users**

- Quản lý thông tin người dùng.
- Các trường: `email`, `firstname`, `lastname`, `password`, `avatar`, `role`, `type`.

### 2. **Products**

- Thông tin sản phẩm chung.
- Có mối quan hệ 1-n với:
  - `product_variant_values`
  - `productImages`
  - `reviews`

### 3. **Product Variant Values**

- Biến thể cụ thể của sản phẩm (ví dụ: size, màu...).
- Có liên kết tới:
  - `variants` qua `variant_values`
  - `order_details` và `cart_items`

### 4. **Variants** và **Variant Values**

- Cấu trúc thuộc tính sản phẩm, ví dụ: Size (S, M, L), Color (Red, Blue).
- Cho phép tạo các biến thể phức tạp.

### 5. **Cart & Cart Items**

- Mỗi người dùng có một `cart`.
- `cart_items` liên kết đến biến thể sản phẩm.

### 6. **Orders & Order Details**

- Thông tin về đơn hàng người dùng đặt.
- `order_details` lưu chi tiết từng sản phẩm (biến thể) đã mua.

### 7. **Categories** và **Sections**

- Phân loại sản phẩm theo danh mục và chuyên mục.

### 8. **ProductImages**

- Lưu đường dẫn ảnh liên quan đến sản phẩm.

### 9. **Reviews**

- Người dùng có thể đánh giá sản phẩm đã mua.

### 10. **Address**

- Mỗi người dùng có thể có nhiều địa chỉ giao hàng.

---

## 📦 Các tính năng chính của hệ thống

- 🔐 Đăng ký / Đăng nhập người dùng, Đăng nhập với Google, Captcha khi đăng ký
- 📦 Quản lý sản phẩm & biến thể
- 🛒 Giỏ hàng và mua hàng, thanh toán khi nhận hàng, thanh toán với QRCODE
- 🧾 Quản lý đơn hàng
- 📤 Quản lý hình ảnh sản phẩm
- 🏷️ Phân loại sản phẩm theo danh mục và chuyên mục
- 🏠 Quản lý địa chỉ người dùng

---

## 🛠 Công nghệ đề xuất

- **Backend**: Node.js (Express), Sequelize ORM
- **Database**: PostgreSQL / MySQL
- **Authentication**: JWT
- **Frontend**: React.js (nếu có UI)
