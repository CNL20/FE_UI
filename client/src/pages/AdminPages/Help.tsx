import React from "react";

const Help: React.FC = () => {
  return (
    <div>
      <h1>Hướng dẫn</h1>
      <section>
        <h2>Video hướng dẫn</h2>
        <p>
          Video hướng dẫn sử dụng các chức năng chính sẽ được hiển thị tại đây.
        </p>
      </section>
      <section>
        <h2>Câu hỏi thường gặp (FAQ)</h2>
        <ul>
          <li>Làm thế nào để tạo tài khoản?</li>
          <li>Làm thế nào để khôi phục mật khẩu?</li>
          {/* Add more FAQs as needed */}
        </ul>
      </section>
      <section>
        <h2>Liên hệ hỗ trợ</h2>
        <p>Email: support@example.com</p>
        <p>Hotline: 123-456-789</p>
      </section>
    </div>
  );
};

export default Help;
