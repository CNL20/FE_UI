import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";

type UserNotification = {
  notificationId: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type: string;
};

const ParentNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("auth_token") ||
        localStorage.getItem("AUTH_TOKEN");

      // Lấy userId từ user_data
      const userDataStr = localStorage.getItem("user_data");
      let userId: string | null = null;
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          userId = userData.id ? userData.id.toString() : null;
        } catch {
          userId = null;
        }
      }

      if (!token || !userId) {
        setLoading(false);
        return;
      }
      try {
        // SỬA Ở ĐÂY: chỉ thêm /Notification, KHÔNG thêm /api nữa
        const res = await fetch(
          `${API_BASE_URL}/Notification?recipientId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setNotifications(
            Array.isArray(data) ? data : data.notifications || []
          );
        } else {
          setNotifications([]);
        }
      } catch (err) {
        setNotifications([]);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Thông báo của bạn</h2>
      {loading ? <p>Đang tải...</p> : null}
      {!loading && notifications.length === 0 ? (
        <p>Không có thông báo nào!</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {notifications.map((n) => (
            <li
              key={n.notificationId}
              style={{
                marginBottom: 16,
                background: n.isRead ? "#f4f4f4" : "#e3f2fd",
                padding: 16,
                borderRadius: 6,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <b>{n.title}</b> <br />
              {n.message} <br />
              <small>
                {n.createdAt
                  ? new Date(n.createdAt).toLocaleString()
                  : ""}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParentNotification;