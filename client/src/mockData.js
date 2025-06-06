// Mock user data
export const roles = [
  {
    id: "manager",
    name: "Quản lý",
    description: "Quản lý hệ thống",
    permissions: ["manage_users", "view_reports", "manage_settings"],
    dashboard: "/manager-dashboard",
  },
  {
    id: "admin",
    name: "Quản trị viên",
    description: "Quản trị viên hệ thống",
    permissions: ["manage_all", "view_all", "manage_settings"],
    dashboard: "/admin-dashboard",
  },
  {
    id: "nurse",
    name: "Y tá",
    description: "Y tá trường học",
    permissions: [
      "manage_health_records",
      "view_students",
      "manage_appointments",
    ],
    dashboard: "/nurse-dashboard",
  },
  {
    id: "parent",
    name: "Phụ huynh",
    description: "Phụ huynh học sinh",
    permissions: [
      "view_own_children",
      "view_health_records",
      "make_appointments",
    ],
    dashboard: "/parent-dashboard",
  },
];

// Hàm đăng nhập thực tế
export const login = async (username, password, role) => {
  try {
    // Validate input
    if (!username || !password || !role) {
      throw new Error("Vui lòng điền đầy đủ thông tin đăng nhập");
    }

    // Validate role
    const validRole = roles.find((r) => r.id === role);
    if (!validRole) {
      throw new Error("Vai trò không hợp lệ");
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
          role: role,
        }),
        credentials: "include", // Cho phép gửi cookies
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Đăng nhập thất bại");
    }

    const data = await response.json();

    // Validate response data
    if (!data.token || !data.user) {
      throw new Error("Dữ liệu phản hồi không hợp lệ");
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn."
      );
    }
    throw new Error(error.message || "Có lỗi xảy ra khi đăng nhập");
  }
};

// Hàm kiểm tra quyền
export const hasPermission = (userRole, requiredPermission) => {
  const role = roles.find((r) => r.id === userRole);
  return role?.permissions.includes(requiredPermission) || false;
};

// Hàm lấy dashboard URL theo role
export const getDashboardUrl = (role) => {
  const roleData = roles.find((r) => r.id === role);
  return roleData?.dashboard || "/";
};
