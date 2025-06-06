// Mock user data
export const roles = [
  {
    id: "manager",
    name: "Quản lý",
    description: "Quản lý hệ thống",
  },
  {
    id: "admin",
    name: "Quản trị viên",
    description: "Quản trị viên hệ thống",
  },
  {
    id: "nurse",
    name: "Y tá",
    description: "Y tá trường học",
  },
  {
    id: "parent",
    name: "Phụ huynh",
    description: "Phụ huynh học sinh",
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "Manager User",
    email: "manager@school.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@school.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "3",
    name: "Nurse User",
    email: "nurse@school.com",
    password: "nurse123",
    role: "nurse",
  },
  {
    id: "4",
    name: "Parent User",
    email: "parent@school.com",
    password: "parent123",
    role: "parent",
  },
];

// Mock login function
export const mockLogin = async (username, password, role) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    (u) => u.email === username && u.password === password && u.role === role
  );

  if (!user) {
    throw new Error("Email, mật khẩu hoặc vai trò không đúng");
  }

  // Create a mock token
  const token = "mock-jwt-token-" + Math.random();

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
